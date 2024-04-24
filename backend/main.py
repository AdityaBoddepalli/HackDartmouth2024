from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vertexai.language_models import ChatModel, InputOutputTextPair
import requests
from bs4 import BeautifulSoup
import utils
from google.cloud import firestore
from fastapi.middleware.cors import CORSMiddleware

tempcache = {}
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Specifies the list of origins that are allowed, ["*"] allows all domains
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class Question(BaseModel):
    sid: str
    question: str


class summarize_query(BaseModel):
    sid: str
    url: str


@app.post("/chat/")
async def ask_question(question: Question):
    print("-" * 40)
    print(question.question)
    print(question.sid)
    print("-" * 50)
    try:
        chat_model = ChatModel.from_pretrained("chat-bison@002")

        parameters = {
            "temperature": 0.9,
            "max_output_tokens": 1024,
            "top_p": 0.95,
            "top_k": 40,
        }

        db = firestore.Client()
        doc_ref = db.collection("HackDart").document("context")
        doc = doc_ref.get()

        context = doc.to_dict()[question.sid]

        chat = chat_model.start_chat(
            context=context,
        )

        question_suffix = (
            " Answer according to the provided context in no more than 4 lines."
        )

        response = chat.send_message(question.question + question_suffix, **parameters)
        print(f"Response: {response.text}")
        doc_ref.set({question.sid: context + response.text}, merge=True)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/summarize/")
async def summarize_text(query: summarize_query):
    if query.sid + query.url in tempcache:
        return tempcache[query.sid + query.url]
    print("-" * 40)
    print(query.url)
    print(query.sid)
    print("-" * 50)

    typeofthingy = query.sid.split("-")[1]
    feature_map = {
        "Education": [
            "Personal Data",
            "Information Collected",
            "Information Disclosed",
        ],
        "Technology": [
            "Personal Data",
            "Information Collected",
            "Information Disclosed",
        ],
        "Finance": ["Payment Information", "Third-Party Sharing", "Security Measures"],
        "Shopping": ["Payment Information", "Personal Data", "Return Policy"],
        "Social": ["Personal Data", "Advertising Data", "Information Disclosed"],
        "Health": ["Health Data", "Data Collected", "Third-Party Sharing"],
        "Travel": ["Personal Data", "Travel Information", "Information Collected"],
        "News": [
            "Subscription Information",
            "Information Collected",
            "Information Disclosed",
        ],
    }

    feature_map_toc = {
        "Education": [
            "Usage Rights and Limitations",
            "License to Educational Tools",
            "User Conduct",
        ],
        "Technology": [
            "Personal Data",
            "Information Collected",
            "Information Disclosed",
        ],
        "Finance": [
            "Liability and Warranty Disclaimers",
            "Arbitration Clauses",
            "Account Termination and Suspension",
        ],
        "Shopping": ["Payment Information", "Personal Data", "Return Policy"],
        "Social": [
            "Termination of Service",
            "Advertising Data",
            "Information Disclosed",
        ],
        "Health": ["Health Data", "Data Collected", "Third-Party Sharing"],
        "Travel": ["Personal Data", "Travel Information", "Information Collected"],
        "News": [
            "Subscription Information",
            "Information Collected",
            "Information Disclosed",
        ],
    }

    chat_model = ChatModel.from_pretrained("chat-bison@002")

    # TODO developer - override these parameters as needed:
    parameters = {
        "temperature": 1.0,  # Temperature controls the degree of randomness in token selection.
        "max_output_tokens": 1024,  # Token limit determines the maximum amount of text output.
        "top_p": 0.95,  # Tokens are selected from most probable to least until the sum of their probabilities equals the top_p value.
        "top_k": 40,  # A top_k of 1 means the selected token is the most probable among all tokens.
    }

    # with open('./backend/context.txt', 'r') as file:
    #     context = file.read()

    context = utils.get_body_from_url(query.url)

    db = firestore.Client()
    doc_ref = db.collection("HackDart").document("context")
    doc_ref.set({query.sid.split("-")[0]: context}, merge=True)

    chat = chat_model.start_chat(
        context=context,
    )

    docname = "Terms of Conditions" if typeofthingy == "toc" else "Privacy Policy"

    category_question = f"The context given to you is a {docname} of a website. I want you to identify the category of the service based on the context. Your options are: Education, Finance, Shopping, Social, Health, Travel, News. Your answer should just be one word and it should be one of those options."

    category_response = chat.send_message(category_question, **parameters)
    print(f"Category: {category_response.text}")

    category_summary_question = f"Now that you have identified the category, I want you to summarize the {docname} in the context of the category you identified. Your answer should be a brief summary of no more than 3 lines."
    category_summary_response = chat.send_message(
        category_summary_question, **parameters
    )
    summary = category_summary_response.text.split(".")[:-1]
    summary = [x.strip() for x in summary]

    if typeofthingy == "toc":
        features = feature_map_toc[category_response.text.strip()]
    else:
        features = feature_map[category_response.text.strip()]
    category = category_response.text.strip()
    feature_ratings = [0, 0, 0]
    feature_explanations = ["", "", ""]

    for ii in range(len(features)):
        feature1_question = f"Now that you have identified the category as {category_response.text}, I want you to analyze the {docname} in the context from the lens of {features[ii]}. Here is a rating scale to help you, 1 is poor, 2 is below average, 3 is mid, 4 is above average, 5 is excellent. If the provided {docname} has no mention of {features[ii]} set the rating as 0. I want you to rate the {docname} based on {features[ii]} but make sure to read everything related to {features[ii]} before giving a rating. Your answer should be a number, which is your rating as per the scale followed by a period. Then you should give a single line explanation of minimum 10 words for your rating."
        feature1_response = chat.send_message(feature1_question, **parameters)
        feature_ratings[ii] = int(feature1_response.text.split(".")[0].strip())
        feature_explanations[ii] = feature1_response.text.split(".")[1].strip()
        print(f"{features[ii]}: {feature1_response.text}")
    category_average = sum([int(x) for x in feature_ratings]) / 3
    toRet = {
        "category": category,
        "average_rating": int(category_average),
        "summary": summary,
        "features": features,
        "ratings": feature_ratings,
        "explanations": feature_explanations,
    }
    tempcache[query.sid + query.url] = toRet
    return toRet

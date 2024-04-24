import requests
from bs4 import BeautifulSoup

def get_body_from_url(url):
        # Send an HTTP GET request to the URL
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code == 200:
            # Parse the HTML content
            soup = BeautifulSoup(response.text, "html.parser")

            # Find the body tag and get all the text within it
            body = soup.find("body")
            if body:
                return body.get_text(
                    strip=True
                )  # Return body text, stripped of excess whitespace
            else:
                return "No body tag found in the HTML."
        else:
            return f"Failed to retrieve content. Status code: {response.status_code}"
import requests
from bs4 import BeautifulSoup
import time

base_url = 'https://marvel.fandom.com/wiki/Fantastic_Four_Vol_1'

def fetch_html(url):    
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'lxml')
    return soup

soup = fetch_html(base_url)

for gallery_item in soup.find_all('div', class_='wikia-gallery-item'):    
    issue_link = gallery_item.find('div', class_='lightbox-caption').a.get('href')  # Get links for issues
    
    print(issue_link)
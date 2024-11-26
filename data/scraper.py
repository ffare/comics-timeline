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
    
    issue_soup = fetch_html(f"https://marvel.fandom.com{issue_link}")
    
    issue_cover = issue_soup.find('a', class_='image image-thumbnail').img['src']
    
    issue_data = issue_soup.find('section', class_='pi-item pi-group pi-border-color pi-collapse pi-collapse-open')
    #print(issue_data.prettify())
    
    writer = issue_data.find('div', {'data-source': 'Writers1'}).a.text
    #issue_number
    
    print(issue_cover)
    time.sleep(2)
    
    
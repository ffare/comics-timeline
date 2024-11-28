import requests
from bs4 import BeautifulSoup
import time
import json

base_url = 'https://marvel.fandom.com/wiki/Fantastic_Four_Vol_1'
data_filename = 'data.json'

def fetch_html(url):    
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'lxml')
    return soup

def write_to_data(issue_number, issue_writer, issue_cover):
    issue = {
        "issue_number": issue_number,
        "script": issue_writer,
        "coverImage": issue_cover
    }
    with open('data.json', 'r') as file:
        data = json.load(file)
        data[0]["issues"].append(issue) # Change later to go through all series
    
    print(data[0])
    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)
    

soup = fetch_html(base_url)

for gallery_item in soup.find_all('div', class_='wikia-gallery-item'):    
    issue_link = gallery_item.find('div', class_='lightbox-caption').a.get('href')  # Get links for issues
    
    issue_soup = fetch_html(f"https://marvel.fandom.com{issue_link}")
    
    issue_cover = issue_soup.find('a', class_='image image-thumbnail').img['src'].split('/revision')[0]
    issue_number = issue_soup.find('h2', class_='pi-item pi-item-spacing pi-title pi-secondary-background').get_text().split()[-1]
    
    issue_data = issue_soup.find('section', class_='pi-item pi-group pi-border-color pi-collapse pi-collapse-open')
    issue_writer = issue_data.find('div', {'data-source': 'Writers1'}).a.get_text()
    
    write_to_data(issue_number, issue_writer, issue_cover)
    
    # print(issue_cover)
    #print(issue_number)
    #print(issue_writer)

    
    time.sleep(2)
    
    
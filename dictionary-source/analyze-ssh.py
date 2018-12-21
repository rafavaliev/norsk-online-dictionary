
from bs4 import BeautifulSoup
from lxml import html
from html.parser import HTMLParser
import json


class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if 'span' in tag and False:
            print("Encountered a start tag:", tag)
        for attr in attrs:
            print(attr)

    def handle_endtag(self, tag):
        if 'span' in tag and False:
            print("Encountered an end tag :", tag)

    def handle_data(self, data):
        if len(data) > 0:
            print("Data  :", data)


parser = MyHTMLParser()

lines = [line.rstrip('\n') for line in open('output.html')]
html = ''.join(lines[0:200])
html = html.replace("<br/>", "")

# parser.feed(html)
# parser.close()

soup = BeautifulSoup(html, "lxml")
spans = soup.findAll(
    "span", {"style": "font-family: b'Tahoma'; font-size:6px"})
for span in spans:
    print(span)

# BOGOMOTION2 *powered by [AI module Bogomotion-2.0-API](https://github.com/PanPeryskop/Bogomotion-2.0-API)*

## Smart dataset creator made during a 24-hour Hackathon

## *The application won 2nd place*

<img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/index_page.png?raw=true" alt="Index page"/>

## Features

- AI chat [(AI module)](https://github.com/PanPeryskop/Bogomotion-2.0-API)
<br/><img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/ai_chat.jpg?raw=true" alt="AI chat" width="200"/>

- Users can upload assets
<br/><img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/upload_asset.jpg?raw=true" alt="Upload asset" width="200"/>

- Before being uploaded, assets are scanned: AI checks the quality of the photo. If the quality is acceptable, the next AI module recognizes the face and labels the photo (the frame is saved to the database)
<br/><img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/labeling.jpg?raw=true" alt="Labeling" width="200"/>

- Each asset in the dataset is reviewed by 3 users
<br/><img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/review.jpg?raw=true" alt="Review" width="200"/>

- Reviewed assets are evaluated by other users 
<br/><img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/decision.jpg?raw=true" alt="Decision" width="200"/>

- The dataset is stored in a Postgres database
<br/><img src="https://github.com/azizko1337/bogomotion2/blob/master/readme_images/database.png?raw=true" alt="Database" width="200"/>

## Installation
1. Prepare the [AI module - (Bogomotion-2.0-API)](https://github.com/PanPeryskop/Bogomotion-2.0-API)
2. Follow the steps described in the /backend and /frontend folders
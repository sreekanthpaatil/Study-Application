import axios from 'axios';
import cheerio from 'cheerio';

export const getEvents = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthenticated.' });
        // Web scraping logic
        const url = 'https://cio.economictimes.indiatimes.com/events';
        const response = await axios.get(url);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            const events = [];

            $('li.award-stroy-panel__item').each((index, element) => {
                const headline = $(element).find('h2').text();
                const description = $(element).find('h3').text();
                const date = $(element).find('li.sprite-icon-img.calender-icon p').text() || 'N/A';
                const location = $(element).find('li.sprite-icon-img.location-icon p').text() || 'N/A';
                const link = $(element).find('a').attr('href');

                events.push({
                    headline,
                    description,
                    date,
                    location,
                    link,
                });
            });

            // Render the HTML template with the extracted information
            res.json({ events });
        } else {
            res.status(response.status).json("Could not get webpage");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}
import theWorldAccordingToCarl from '../assets/images/books/the-world-according-to-carl.jpg';
import collectingFashionBook from '../assets/images/books/collecting-fashion-book.jpg';
import arrangingThingsColinKingBook from '../assets/images/books/arranging-things-colin-king-book.jpg';
import karlLagerfeldALifeInHousesBook from '../assets/images/books/karl-lagerfeld-a-life-in-houses-book.jpg';
import theRiseOfDavidBowieMickRockBook from '../assets/images/books/the-rise-of-david-bowie-mick-rock-book.jpg';
import pattySmithABookOfDays from '../assets/images/books/patty-smith-a-book-of-days.jpg';
import aHardDaysNightBook from '../assets/images/books/a-hard-days-night-book.jpg';
import aWeekAbroadMarseilleBook from '../assets/images/books/a-week-abroad-marseille-book.jpg';
import newYorkCityGuideByLouisVuitton from '../assets/images/books/new-york-city-guide-by-louis-vuitton.jpg';
import theSpanishHomeKitchenBook from '../assets/images/books/the-spanish-home-kitchen-book.jpg';

const books = [
  {
    id: '89cfc303-88a1-49ff-b0f0-284427a8ce55',
    title: 'The World According To Carl',
    details:
      'Karl Lagerfeld, a modern maestro of haute couture, is equally celebrated for his unabashed honesty. His wise and surprising statements make unconventional headlines. This concise collection of quotes pays tribute to the legendary fashion luminary. Lagerfeld’s musings on fashion, women, art, politics, love and life have become famously prophetic, resonating with fashion aficionados, devotees and intellectuals worldwide.',
    price: '15.99',
    image: theWorldAccordingToCarl
  },
  {
    id: '657e56a2-e7c5-4791-b723-762f8f063371',
    title: 'Collecting Fashion Book',
    details:
      'For fashion to advance, you must have the ability to look back. For those obsessed with fashion, the archive is undoubtedly a testimony of the act of preservation and, of course, a sophisticated symbol of taste. The archives take time to be built, the wardrobes or storage units full of rare shoes, dresses and bags, some never used, are only perfected after countless hours spent on eBay and in the depths of dark vintage sales. The results end up being remarkable representations of the history of fashion.',
    price: '75.00',
    image: collectingFashionBook
  },
  {
    id: '91afd076-ac39-4273-9c81-e614534a1e0c',
    title: 'Arranging Things Colin King Book',
    details:
      'We all want our rooms to look attractive and reflect a considered approach. Now we have the mastery of Colin King to help us elevate our spaces into environments of personal creativity. Image after image, readers will discover how Colin works his magic when arranging objects on coffee tables, mantels, bookshelves, bedside tables, windowsills, and more.',
    price: '90.00',
    image: arrangingThingsColinKingBook
  },
  {
    id: 'bb05c79a-bc3a-4185-a513-9fb10a37c0ef',
    title: 'Karl Lagerfeld: A Life in Houses Book',
    details:
      'After an overview by Patrick Mauriès, each house is introduced by a short text by Marie Kalt that reveals its history and identifies the designers and key pieces.',
    price: '159.00',
    image: karlLagerfeldALifeInHousesBook
  },
  {
    id: 'efa86957-efc2-43a1-a3ad-d3891c5c3fe9',
    title: 'The Rise of David Bowie, Mick Rock Book',
    details:
      "Tribute to David Bowie by his official photographer, Mick Rock. Compiled in 2015 with Bowie's permission, this collection reviews the musical, theatrical and sexual revolution that was the avant-garde Ziggy Stardust world tour of 1972 and 1973, with on-stage snapshots, backstage portraits and press clippings. A tribute to an exceptional artist.",
    price: '89.90',
    image: theRiseOfDavidBowieMickRockBook
  },
  {
    id: '77c27855-ec0d-444a-8d9f-10e3c1c603ec',
    title: 'Patty Smith: A Book of Days',
    details:
      'In 2018, with no predetermined plan or agenda, Patti Smith shared her first Instagram post: a photo of her hand with a caption that simply read “Hello Everybody!” Known for taking pictures with her beloved Land 250 camera, Smith began posting photos with her phone—ranging from portraits of her children to snapshots of her heater, boots, and Abyssinian cat, Cairo. These glimpses into Smith’s world resonated with followers, establishing an immediate connection.',
    price: '49.90',
    image: pattySmithABookOfDays
  },
  {
    id: '1175e860-5b71-4fa9-b7d0-201e09f4a89c',
    title: "A Hard Day's Night Book",
    details:
      'In March of 1964, director Richard Lester embarked on the production of “A Hard Day’s Night”, a feature film starring The Beatles. Infused with quick-witted humor and underscored by a brilliant soundtrack, the movie vividly portrays the thrill and tumult of thirty-six hours in the lives of John Lennon, Paul McCartney, George Harrison, and Ringo Starr. This collection of photographs and exclusive material captures the infectious energy and anarchic spirit that defined this pioneering film.',
    price: '189.00',
    image: aHardDaysNightBook
  },
  {
    id: 'dba1ea27-c10b-4846-a8a0-3cf19e28278b',
    title: 'A Week Abroad Marseille Book',
    details:
      'The A Week Abroad travel book allows us to meet inspiring local personalities who share their favorite places. Exceptional local products, good restaurants, traditional crafts, wild landscapes and treasures of nature: experience recommendations that could have been from friends from all over world. Interviews, address lists and a removable illustrated map will help you to spend a week like a native.',
    price: '39.90',
    image: aWeekAbroadMarseilleBook
  },
  {
    id: '2cd19f8b-1a0a-45fa-9228-208fcf06ed2c',
    title: 'New York City Guide by Louis Vuitton',
    details:
      "Since 1998, Louis Vuitton City Guides have established themselves as the ultimate travel companions, bringing to life the world's most fascinating cities for business and leisure travelers alike. To capture the spirit of each city, Louis Vuitton reaches out to journalists, writers and major figures in the world of art and letters, whose contributions - together with those of artists, businesspeople and creative talents from many fields - make each City Guide a publication like no other.",
    price: '59.90',
    image: newYorkCityGuideByLouisVuitton
  },
  {
    id: 'dbf174a6-abeb-4a0e-a1ca-f8e308a436ef',
    title: 'The Spanish Home Kitchen Book',
    details:
      'A collection of over 80 of the best recipes from the heart of chef José Pizarro’s Spanish family home. In The Spanish Home Kitchen, José Pizarro returns to his mother’s home to take inspiration from the flavors he grew up with and shares more than 80 of her favorite recipes, collected from all over Spain. José Pizarro grew up in the center-west of Spain, in the small town of Talaván. His family were farmers for generations and he spent his childhood on his parents’ farm, helping his father produce vegetables, dairy products and different meats.',
    price: '69.90',
    image: theSpanishHomeKitchenBook
  }
];

export default books;

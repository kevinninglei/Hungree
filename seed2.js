/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

// var bluebird = require('bluebird');
var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Address = mongoose.model('Address');
var Dish = mongoose.model('Dish');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');
var Tag = mongoose.model('Tag');
var q = require('q');
var _ = require('lodash');
var chance = require('chance')(123);

var tags = [{
  name: "American"
}, {
  name: "Cajun and Creole"
}, {
  name: "Indian"
}, {
  name: "The Melting Pot"
}, {
  name: "French"
}, {
  name: "N/A"
}, {
  name: "California"
}, {
  name: "Mexican"
}, {
  name: "Pacific Northwest"
}, {
  name: "Italian"
}, {
  name: "Asian"
}, {
  name: "Russian / Eastern European"
}, {
  name: "Austrian"
}, {
  name: "New England"
}, {
  name: "Spanish / Portuguese"
}, {
  name: "Vietnamese"
}];

tags = tags.map(function(tag) {
  return new Tag(tag);
});

var reviews = [];

var dishes = [{
  "name": "Cheddar and Leek Soup",
  "id": "cheddar-and-leek-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/cheddar-and-leek-soup",
  "cuisine": tags[0],
  "cooking_method": "Cream",
  "ingredients": [
    "butter",
    "Mirepoix",
    "leeks",
    "all purpose flour",
    "Chicken Stock",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "dry white wine",
    "half & half cream",
    "cheddar cheese",
    "salt",
    "cayenne pepper",
    "fresh parsley",
    "Croutons"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/cheddar_and_leek_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/cheddar_and_leek_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/cheddar_and_leek_soup.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Chicken And Sausage Gumbo",
  "id": "chicken-and-sausage-gumbo",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/chicken-and-sausage-gumbo",
  "cuisine": "American: Cajun and Creole",
  "cooking_method": "Broth",
  "ingredients": [
    "cayenne pepper",
    "paprika",
    "ground white pepper",
    "ground black pepper",
    "boneless skinless chicken breast",
    "salt",
    "all purpose flour",
    "vegetable oil",
    "onion",
    "celery",
    "green bell pepper",
    "garlic",
    "filé powder",
    "dried bay leaves",
    "Chicken Stock",
    "andouille",
    "okra",
    "long grain rice",
    "green onion"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/chicken_and_sausage_gumbo.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/chicken_and_sausage_gumbo_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/chicken_and_sausage_gumbo.jpg",
  "tags": [
    tags[0],
    tags[1]
  ]
}, {
  "name": "Chicken Curry Spread",
  "id": "chicken-curry-spread",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/chicken-curry-spread",
  "cuisine": tags[2],
  "cooking_method": null,
  "ingredients": [
    "boneless skinless chicken breast",
    "cream of coconut",
    "mayonnaise",
    "curry powder",
    "Lemon Juice (fresh)",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/curried_chicken_canapes.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/curried_chicken_canapes_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/curried_chicken_canapes.jpg",
  "tags": [
    tags[2]
  ]
}, {
  "name": "Chicken Soup With Matzo Balls",
  "id": "chicken-soup-with-matzo-balls",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/chicken-soup-with-matzo-balls",
  "cuisine": "American: The Melting Pot",
  "cooking_method": "Broth",
  "ingredients": [
    "whole 3 lb up chicken",
    "Chicken Stock",
    "Mirepoix",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley",
    "salt",
    "ground black pepper",
    "fresh parsley",
    "Matzo Balls"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/chicken_soup_w_matzo_balls.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/chicken_soup_w_matzo_balls_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/chicken_soup_w_matzo_balls.jpg",
  "tags": [
    tags[0],
    tags[3]
  ]
}, {
  "name": "Chicken Velouté",
  "id": "chicken-velouta",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/chicken-velouta",
  "cuisine": tags[4],
  "cooking_method": "Simmering",
  "ingredients": [
    "Clarified Butter",
    "all purpose flour",
    "Chicken Stock",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/veloute.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/veloute_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/veloute.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Classic Rice Pilaf",
  "id": "classic-rice-pilaf",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/classic-rice-pilaf",
  "cuisine": tags[2],
  "cooking_method": "Pilaf method",
  "ingredients": [
    "Clarified Butter",
    "olive oil",
    "onion",
    "dried bay leaves",
    "long grain rice",
    "Chicken Stock",
    "salt"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/classic_rice_pilaf.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/classic_rice_pilaf_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/classic_rice_pilaf.jpg",
  "tags": [
    tags[2]
  ]
}, {
  "name": "Cream Of Broccoli Soup",
  "id": "cream-of-broccoli-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/cream-of-broccoli-soup",
  "cuisine": tags[0],
  "cooking_method": "Cream",
  "ingredients": [
    "butter",
    "onion",
    "celery",
    "broccoli",
    "Chicken Velouté",
    "Chicken Stock",
    "heavy cream",
    "salt",
    "ground white pepper",
    "broccoli florets"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/cream_of_broccoli_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/cream_of_broccoli_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/cream_of_broccoli_soup.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Filet of Beef with Coffee Beans",
  "id": "filet-of-beef-with-coffee-beans",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/filet-of-beef-with-coffee-beans",
  "cuisine": tags[5],
  "cooking_method": "Roasting",
  "ingredients": [
    "beef tenderloin",
    "kosher salt",
    "ground black pepper",
    "olive oil",
    "coffee beans",
    "cocoa powder",
    "ground cinnamon",
    "butter",
    "white onion",
    "garlic clove",
    "pasilla chile pepper",
    "corn tortilla",
    "Chicken Stock",
    "heavy cream",
    "kosher salt",
    "light brown sugar",
    "grits"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/filet_of_beef_w_coffee_beans.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/filet_of_beef_w_coffee_beans_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/filet_of_beef_w_coffee_beans.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "French Onion Soup",
  "id": "french-onion-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/french-onion-soup",
  "cuisine": tags[4],
  "cooking_method": "Broth",
  "ingredients": [
    "yellow onion",
    "Clarified Butter",
    "Beef Stock",
    "Chicken Stock",
    "fresh thyme",
    "salt",
    "ground black pepper",
    "dry sherry",
    "French bread",
    "gruyere cheese"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/french_onion_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/french_onion_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/french_onion_soup.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Garden Frittata",
  "id": "garden-frittata",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/garden-frittata",
  "cuisine": "American: California",
  "cooking_method": "Sautéing",
  "ingredients": [
    "boneless skinless chicken breast",
    "garlic",
    "ground cumin",
    "salt",
    "ground black pepper",
    "medium mushrooms",
    "unsalted butter",
    "jalapeno chile pepper",
    "red bell pepper",
    "green onion",
    "fresh cilantro",
    "eggs",
    "monterey jack cheese"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/garden_frittata.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/garden_frittata_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/garden_frittata.jpg",
  "tags": [
    tags[0],
    tags[6]
  ]
}, {
  "name": "Mole",
  "id": "mole",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/mole",
  "cuisine": tags[7],
  "cooking_method": "Simmering",
  "ingredients": [
    "cinnamon stick",
    "ground allspice",
    "guajillo chile pepper",
    "pasilla chile pepper",
    "sesame seeds",
    "pumpkin seeds",
    "whole cumin",
    "onion",
    "olive oil",
    "plum tomatoes",
    "garlic clove",
    "fresh thyme",
    "dried whole oregano",
    "Chicken Stock",
    "salt",
    "semisweet chocolate"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/mole.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/mole_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/mole.jpg",
  "tags": [
    tags[7]
  ]
}, {
  "name": "Mulligatawny Soup",
  "id": "mulligatawny-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/mulligatawny-soup",
  "cuisine": tags[2],
  "cooking_method": "Simmering",
  "ingredients": [
    "unsalted butter",
    "Mirepoix",
    "all purpose flour",
    "curry powder",
    "Chicken Stock",
    "boneless skinless chicken breast",
    "granny smith apple",
    "medium mushrooms",
    "milk",
    "salt",
    "ground white pepper",
    "fresh chives"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/mulligatawny_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/mulligatawny_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/mulligatawny_soup.jpg",
  "tags": [
    tags[2]
  ]
}, {
  "name": "Posole",
  "id": "posole",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/posole",
  "cuisine": tags[7],
  "cooking_method": "Simmering",
  "ingredients": [
    "pork shoulder",
    "Chicken Stock",
    "canned hominy",
    "onion",
    "garlic",
    "fresh oregano",
    "salt",
    "ground black pepper",
    "cayenne pepper",
    "whole 2 Â½ - 3 Â½ lb chicken",
    "olive oil",
    "chili powder",
    "canned tomatoes",
    "anaheim chile pepper",
    "fresh cilantro",
    "lime",
    "corn tortilla",
    "vegetable oil",
    "romaine lettuce",
    "cider vinegar",
    "onion"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/posole.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/posole_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/posole.jpg",
  "tags": [
    tags[7]
  ]
}, {
  "name": "Potato Chowder with Nisqually Smoked Salmon",
  "id": "potato-chowder-with-nisqually-smoked-salmon",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/potato-chowder-with-nisqually-smoked-salmon",
  "cuisine": "American: Pacific Northwest",
  "cooking_method": "Simmering",
  "ingredients": [
    "prosciutto",
    "onion",
    "Yukon gold potato",
    "Chicken Stock",
    "Roux",
    "dill weed",
    "dried whole thyme",
    "heavy cream",
    "Nisqually smoked salmon",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/potato_chowder_w_nisqually_smoked_salmon.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/potato_chowder_w_nisqually_smoked_salmon_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/potato_chowder_w_nisqually_smoked_salmon.jpg",
  "tags": [
    tags[0],
    tags[8]
  ]
}, {
  "name": "Purée of Split Pea Soup",
  "id": "pura-e-of-split-pea-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/pura-e-of-split-pea-soup",
  "cuisine": tags[5],
  "cooking_method": "Purée",
  "ingredients": [
    "bacon",
    "Mirepoix",
    "garlic clove",
    "Chicken Stock",
    "green split peas",
    "ham hocks",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "salt",
    "ground black pepper",
    "Croutons"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/puree_of_split_pea_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/puree_of_split_pea_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/puree_of_split_pea_soup.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Red Pepper Coulis",
  "id": "red-pepper-coulis",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/red-pepper-coulis",
  "cuisine": tags[4],
  "cooking_method": "Purée",
  "ingredients": [
    "vegetable oil",
    "garlic",
    "onion",
    "red bell pepper",
    "white wine",
    "Chicken Stock",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/red_pepper_coulis.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/red_pepper_coulis_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/red_pepper_coulis.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Risotto Milanese",
  "id": "risotto-milanese",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/risotto-milanese",
  "cuisine": tags[9],
  "cooking_method": "Risotto method",
  "ingredients": [
    "Chicken Stock",
    "saffron",
    "water",
    "butter",
    "onion",
    "arborio rice",
    "dry white wine",
    "parmesan cheese"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/risotto_milanese.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/risotto_milanese_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/risotto_milanese.jpg",
  "tags": [
    tags[9]
  ]
}, {
  "name": "Roasted Corn Chowder",
  "id": "roasted-corn-chowder",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/roasted-corn-chowder",
  "cuisine": tags[0],
  "cooking_method": "Simmering",
  "ingredients": [
    "fresh corn",
    "milk",
    "salt pork",
    "celery",
    "onion",
    "garlic clove",
    "all purpose flour",
    "Chicken Stock",
    "white potato",
    "heavy cream",
    "worcestershire sauce",
    "fresh thyme",
    "ground nutmeg",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_corn_chowder.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/roasted_corn_chowder_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_corn_chowder.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Roasted Poblano Chile and Corn Soup",
  "id": "roasted-poblano-chile-and-corn-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/roasted-poblano-chile-and-corn-soup",
  "cuisine": tags[7],
  "cooking_method": "Purée",
  "ingredients": [
    "lime",
    "sour cream",
    "poblano chile pepper",
    "vegetable oil",
    "fresh corn",
    "onion",
    "carrot",
    "garlic clove",
    "Chicken Stock",
    "heavy cream",
    "salt",
    "ground black pepper",
    "poblano chile pepper",
    "frozen corn kernels",
    "corn tortilla"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_poblano_chile_and_corn_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/roasted_poblano_chile_and_corn_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_poblano_chile_and_corn_soup.jpg",
  "tags": [
    tags[7]
  ]
}, {
  "name": "Roasted Vegetable Soup",
  "id": "roasted-vegetable-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/roasted-vegetable-soup",
  "cuisine": tags[5],
  "cooking_method": "Purée",
  "ingredients": [
    "onion",
    "zucchini",
    "yellow squash",
    "red bell pepper",
    "yellow bell pepper",
    "green bell pepper",
    "plum tomatoes",
    "medium asparagus",
    "olive oil",
    "salt",
    "ground black pepper",
    "dried whole thyme",
    "Chicken Stock",
    "Roasted Garlic Purée",
    "fresh parsley",
    "baguette"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_veg_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/roasted_veg_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_veg_soup.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Southeast Asian Consommé with Lemongrass",
  "id": "southeast-asian-consomma-with-lemongrass",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/southeast-asian-consomma-with-lemongrass",
  "cuisine": tags[10],
  "cooking_method": "Consommé",
  "ingredients": [
    "egg whites",
    "boneless skinless chicken breast",
    "Mirepoix",
    "Lime Juice (fresh)",
    "Chicken Stock",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley",
    "whole star anise",
    "fresh ginger",
    "Lime Zest",
    "lemongrass",
    "shiitake mushrooms",
    "Thai chile pepper",
    "fresh cilantro",
    "soy sauce",
    "salt",
    "ground white pepper",
    "granulated sugar",
    "rice noodles",
    "snow peas",
    "carrot",
    "shiitake mushrooms",
    "fresh cilantro",
    "fresh mint",
    "fresh basil"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/se_asian_consomme_w_lemongrass.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/se_asian_consomme_w_lemongrass_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/se_asian_consomme_w_lemongrass.jpg",
  "tags": [
    tags[10]
  ]
}, {
  "name": "Southeast Asian-Style Peanut Sauce",
  "id": "southeast-asian-style-peanut-sauce",
  "url": "http://s3-media1.fl.yelpcdn.com/bphoto/WXfvxIyCr-wJArn5Dx9Agw/348s.jpg",
  "cuisine": tags[10],
  "cooking_method": null,
  "ingredients": [
    "garlic",
    "onion",
    "red pepper flakes",
    "lime leaves",
    "curry powder",
    "lemongrass",
    "vegetable oil",
    "coconut milk",
    "cinnamon stick",
    "dried bay leaves",
    "Lemon Juice (fresh)",
    "rice vinegar",
    "Chicken Stock",
    "peanut butter"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/southeast_asian_style_peanut_sauce.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/southeast_asian_style_peanut_sauce_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/southeast_asian_style_peanut_sauce.jpg",
  "tags": [
    tags[10]
  ]
}, {
  "name": "Supréme Sauce",
  "id": "supra-me-sauce",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/supra-me-sauce",
  "cuisine": tags[4],
  "cooking_method": "Reduction",
  "ingredients": [
    "Chicken Velouté",
    "medium mushrooms",
    "heavy cream",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/supreme_sauce.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/supreme_sauce_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/supreme_sauce.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Velouté",
  "id": "velouta",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/velouta",
  "cuisine": tags[4],
  "cooking_method": "Reduction",
  "ingredients": [
    "butter",
    "all purpose flour",
    "Chicken Stock",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/veloute.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/veloute_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/veloute.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Vichyssoise (Cold Potato-Leek Soup)",
  "id": "vichyssoise-cold-potato-leek-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/vichyssoise-cold-potato-leek-soup",
  "cuisine": tags[4],
  "cooking_method": "Purée",
  "ingredients": [
    "leeks",
    "butter",
    "russet potato",
    "Chicken Stock",
    "salt",
    "ground white pepper",
    "heavy cream",
    "fresh chives",
    "sweet potato"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/vichyssoise_cold_potato-leek_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/vichyssoise_cold_potato-leek_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/vichyssoise_cold_potato-leek_soup.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Aunt Ruthie's Pot Roast",
  "id": "aunt-ruthie-s-pot-roast",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/aunt-ruthie-s-pot-roast",
  "cuisine": tags[0],
  "cooking_method": "Braising",
  "ingredients": [
    "vegetable oil",
    "beef brisket",
    "onion",
    "garlic",
    "Brown Veal Stock",
    "tomato sauce",
    "light brown sugar",
    "paprika",
    "dry mustard",
    "Lemon Juice (fresh)",
    "ketchup",
    "red wine vinegar",
    "worcestershire sauce",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/aunt_ruthies_pot_roast.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/aunt_ruthies_pot_roast_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/aunt_ruthies_pot_roast.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Beef Bourguignonne",
  "id": "beef-bourguignonne",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-bourguignonne",
  "cuisine": tags[4],
  "cooking_method": "Stewing",
  "ingredients": [
    "garlic clove",
    "onion",
    "carrot",
    "fresh parsley",
    "carrot",
    "leeks",
    "fresh thyme",
    "dried bay leaves",
    "whole black pepper",
    "salt",
    "dry red wine",
    "beef chuck",
    "vegetable oil",
    "all purpose flour",
    "tomato paste",
    "fresh tomatoes",
    "Brown Stock",
    "medium mushrooms",
    "unsalted butter",
    "pearl onion",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_bourguignonne.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/beef_bourguignonne_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_bourguignonne.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Beef Broth",
  "id": "beef-broth",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-broth",
  "cuisine": tags[5],
  "cooking_method": "Broth",
  "ingredients": [
    "beef shank",
    "vegetable oil",
    "Beef Stock",
    "Mirepoix",
    "white turnips",
    "leeks",
    "fresh tomatoes",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley",
    "garlic clove",
    "salt"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_broth.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/beef_broth_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_broth.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Beef Consommé",
  "id": "beef-consomma",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-consomma",
  "cuisine": tags[4],
  "cooking_method": "Consommé",
  "ingredients": [
    "egg whites",
    "ground beef",
    "Mirepoix",
    "fresh tomatoes",
    "Beef Broth",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley",
    "whole cloves",
    "salt"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_consomme.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/beef_consomme_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_consomme.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Beef Fajitas",
  "id": "beef-fajitas",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-fajitas",
  "cuisine": tags[7],
  "cooking_method": "Grilling",
  "ingredients": [
    "garlic clove",
    "salt",
    "whole black pepper",
    "ground cumin",
    "onion powder",
    "chili powder",
    "beef skirt steak",
    "vegetable oil",
    "red bell pepper",
    "yellow bell pepper",
    "green bell pepper",
    "onion",
    "garlic clove",
    "fresh cilantro"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_fajitas.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/beef_fajitas_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_fajitas.jpg",
  "tags": [
    tags[7]
  ]
}, {
  "name": "Beef Stock",
  "id": "beef-stock",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-stock",
  "cuisine": tags[5],
  "cooking_method": "Simmering",
  "ingredients": [
    "beef bones",
    "water",
    "Mirepoix",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "garlic clove",
    "fresh parsley"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/brown_stock.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/brown_stock_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/brown_stock.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Beef Stroganoff",
  "id": "beef-stroganoff",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-stroganoff",
  "cuisine": tags[11],
  "cooking_method": "Sautéing",
  "ingredients": [
    "beef tenderloin",
    "Clarified Butter",
    "onion",
    "button mushrooms",
    "Demi-Glace",
    "heavy cream",
    "sour cream",
    "Dijon mustard",
    "fresh dill",
    "fresh parsley",
    "salt",
    "ground black pepper",
    "egg noodles"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_stroganoff.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/beef_stroganoff_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_stroganoff.jpg",
  "tags": [
    tags[11]
  ]
}, {
  "name": "Beef Wellington",
  "id": "beef-wellington",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/beef-wellington",
  "cuisine": tags[4],
  "cooking_method": "Roasting",
  "ingredients": [
    "beef tenderloin",
    "salt",
    "ground black pepper",
    "vegetable oil",
    "foie gras pÃ¢té",
    "truffle peelings",
    "Puff Pastry",
    "Egg Wash",
    "Madeira Sauce"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_wellington.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/beef_wellington_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/beef_wellington.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Boeuf Ã  la Ficelle (Beef Poached on a String)",
  "id": "boeuf-a-la-ficelle-beef-poached-on-a-string",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/boeuf-a-la-ficelle-beef-poached-on-a-string",
  "cuisine": tags[4],
  "cooking_method": "Poaching",
  "ingredients": [
    "center cut beef tenderloin",
    "white wine",
    "carrot",
    "baby turnips",
    "pearl onion",
    "celery",
    "medium mushrooms",
    "white potato",
    "carrot",
    "leeks",
    "fresh thyme",
    "dried bay leaves",
    "White Veal Stock",
    "salt",
    "ground black pepper",
    "port wine",
    "butter",
    "fresh chives",
    "Dijon mustard"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/boeuf_a_la_ficelle_beef_poached_on_string.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/boeuf_a_la_ficelle_beef_poached_on_string_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/boeuf_a_la_ficelle_beef_poached_on_string.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Bolognese Sauce",
  "id": "bolognese-sauce",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/bolognese-sauce",
  "cuisine": tags[9],
  "cooking_method": "Simmering",
  "ingredients": [
    "Mirepoix",
    "olive oil",
    "butter",
    "ground beef",
    "white wine",
    "milk",
    "ground nutmeg",
    "Tomato Concassé",
    "White Stock",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/bolognese_sauce.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/bolognese_sauce_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/bolognese_sauce.jpg",
  "tags": [
    tags[9]
  ]
}, {
  "name": "Braised Short Ribs of Beef",
  "id": "braised-short-ribs-of-beef",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/braised-short-ribs-of-beef",
  "cuisine": tags[5],
  "cooking_method": "Braising",
  "ingredients": [
    "all purpose flour",
    "salt",
    "ground black pepper",
    "dried whole rosemary",
    "beef short ribs",
    "vegetable oil",
    "onion",
    "celery",
    "Roux",
    "salt",
    "ground black pepper",
    "Mashed Potatoes",
    "scallions",
    "cherry tomatoes"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/braised_short_ribs_of_beef.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/braised_short_ribs_of_beef_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/braised_short_ribs_of_beef.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Brown Beef Stew",
  "id": "brown-beef-stew",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/brown-beef-stew",
  "cuisine": tags[0],
  "cooking_method": "Stewing",
  "ingredients": [
    "vegetable oil",
    "beef chuck",
    "salt",
    "ground black pepper",
    "onion",
    "garlic",
    "all purpose flour",
    "red wine",
    "Brown Stock",
    "tomato purée",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/brown_beef_stew.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/brown_beef_stew_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/brown_beef_stew.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Brown Stock",
  "id": "brown-stock",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/brown-stock",
  "cuisine": tags[5],
  "cooking_method": "Simmering",
  "ingredients": [
    "beef bones",
    "water",
    "Mirepoix",
    "tomato paste",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "garlic clove",
    "fresh parsley"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/brown_stock.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/brown_stock_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/brown_stock.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Carpaccio",
  "id": "carpaccio",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/carpaccio",
  "cuisine": tags[9],
  "cooking_method": "Uncooked",
  "ingredients": [
    "beef tenderloin",
    "mayonnaise",
    "Dijon mustard",
    "salt",
    "ground black pepper",
    "capers",
    "cracked black pepper",
    "onion",
    "olive oil"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/carpaccio.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/carpaccio_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/carpaccio.jpg",
  "tags": [
    tags[9]
  ]
}, {
  "name": "Châteaubriand",
  "id": "cha-teaubriand",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/cha-teaubriand",
  "cuisine": tags[4],
  "cooking_method": "Roasting",
  "ingredients": [
    "beef tenderloin",
    "salt",
    "ground black pepper",
    "Clarified Butter",
    "Béarnaise"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/chateaubriand.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/chateaubriand_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/chateaubriand.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Chili Con Carne",
  "id": "chili-con-carne",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/chili-con-carne",
  "cuisine": tags[0],
  "cooking_method": "Stewing",
  "ingredients": [
    "onion",
    "vegetable oil",
    "garlic",
    "ground beef",
    "canned tomatoes",
    "fresh tomatoes",
    "Brown Stock",
    "chili powder",
    "ground cumin",
    "dried bay leaves",
    "worcestershire sauce",
    "green chile pepper",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/chili_con_carne.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/chili_con_carne_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/chili_con_carne.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Corned Beef Hash",
  "id": "corned-beef-hash",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/corned-beef-hash",
  "cuisine": tags[0],
  "cooking_method": "Pan-frying",
  "ingredients": [
    "white potato",
    "onion",
    "carrot",
    "parsnip",
    "vegetable oil",
    "corned beef brisket",
    "eggs",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/corned_beef_hash.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/corned_beef_hash_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/corned_beef_hash.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "EntrecÃ´tes Bordelaise",
  "id": "entreca-tes-bordelaise",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/entreca-tes-bordelaise",
  "cuisine": tags[4],
  "cooking_method": "Sautéing",
  "ingredients": [
    "beef marrow",
    "EntrecÃ´tes (14 oz)",
    "salt",
    "ground black pepper",
    "Clarified Butter",
    "shallot",
    "red wine",
    "Demi-Glace",
    "butter"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/entrecotes_bordelaise.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/entrecotes_bordelaise_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/entrecotes_bordelaise.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Filet of Beef with Coffee Beans",
  "id": "filet-of-beef-with-coffee-beans",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/filet-of-beef-with-coffee-beans",
  "cuisine": tags[5],
  "cooking_method": "Roasting",
  "ingredients": [
    "beef tenderloin",
    "kosher salt",
    "ground black pepper",
    "olive oil",
    "coffee beans",
    "cocoa powder",
    "ground cinnamon",
    "butter",
    "white onion",
    "garlic clove",
    "pasilla chile pepper",
    "corn tortilla",
    "Chicken Stock",
    "heavy cream",
    "kosher salt",
    "light brown sugar",
    "grits"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/filet_of_beef_w_coffee_beans.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/filet_of_beef_w_coffee_beans_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/filet_of_beef_w_coffee_beans.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "French Onion Soup",
  "id": "french-onion-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/french-onion-soup",
  "cuisine": tags[4],
  "cooking_method": "Broth",
  "ingredients": [
    "yellow onion",
    "Clarified Butter",
    "Beef Stock",
    "Chicken Stock",
    "fresh thyme",
    "salt",
    "ground black pepper",
    "dry sherry",
    "French bread",
    "gruyere cheese"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/french_onion_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/french_onion_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/french_onion_soup.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Hearty Vegetable Beef Soup",
  "id": "hearty-vegetable-beef-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/hearty-vegetable-beef-soup",
  "cuisine": tags[5],
  "cooking_method": "Broth",
  "ingredients": [
    "butter",
    "Mirepoix",
    "white turnips",
    "garlic clove",
    "Beef Broth",
    "Beef Stew Meat",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley",
    "Tomato Concassé",
    "frozen corn kernels",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/hearty_veg_beef_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/hearty_veg_beef_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/hearty_veg_beef_soup.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Home-Style Meatloaf",
  "id": "home-style-meatloaf",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/home-style-meatloaf",
  "cuisine": tags[0],
  "cooking_method": "Baking",
  "ingredients": [
    "onion",
    "celery",
    "garlic",
    "vegetable oil",
    "Fresh Bread Crumbs",
    "tomato juice",
    "ground beef",
    "ground pork",
    "eggs",
    "salt",
    "ground black pepper",
    "fresh parsley",
    "worcestershire sauce",
    "ketchup"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/home-style_meatloaf.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/home-style_meatloaf_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/home-style_meatloaf.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Hugo's Meatballs",
  "id": "hugo-s-meatballs",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/hugo-s-meatballs",
  "cuisine": tags[0],
  "cooking_method": "Roasting",
  "ingredients": [
    "ground beef",
    "dried whole oregano",
    "garlic powder",
    "onion powder",
    "fresh parsley",
    "salt",
    "ground black pepper",
    "parmesan cheese",
    "eggs",
    "worcestershire sauce",
    "dried bread crumbs"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/hugos_meatballs.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/hugos_meatballs_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/hugos_meatballs.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Hungarian Goulash",
  "id": "hungarian-goulash",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/hungarian-goulash",
  "cuisine": tags[12],
  "cooking_method": "Stewing",
  "ingredients": [
    "onion",
    "lard",
    "paprika",
    "garlic",
    "whole caraway seed",
    "salt",
    "ground black pepper",
    "White Stock",
    "tomato paste",
    "Beef Stew Meat"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/hungarian_goulash.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/hungarian_goulash_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/hungarian_goulash.jpg",
  "tags": [
    tags[12]
  ]
}, {
  "name": "Marinated London Broil",
  "id": "marinated-london-broil",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/marinated-london-broil",
  "cuisine": tags[5],
  "cooking_method": "Grilling",
  "ingredients": [
    "olive oil",
    "balsamic vinegar",
    "fresh rosemary",
    "garlic",
    "ground black pepper",
    "salt",
    "beef flank steak"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/marinated_london_broil.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/marinated_london_broil_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/marinated_london_broil.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Minute Steak Dijonaise",
  "id": "minute-steak-dijonaise",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/minute-steak-dijonaise",
  "cuisine": tags[4],
  "cooking_method": "Sautéing",
  "ingredients": [
    "beef sirloin steak",
    "Dijon mustard",
    "onion",
    "Clarified Butter",
    "heavy cream",
    "butter",
    "salt",
    "ground black pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/minute_steak_dijonaise.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/minute_steak_dijonaise_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/minute_steak_dijonaise.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "New England Boiled Dinner",
  "id": "new-england-boiled-dinner",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/new-england-boiled-dinner",
  "cuisine": "American: New England",
  "cooking_method": "Simmering",
  "ingredients": [
    "corned beef brisket",
    "White Stock",
    "dried bay leaves",
    "dried whole thyme",
    "cracked black pepper",
    "fresh parsley",
    "mustard seeds",
    "cinnamon stick",
    "whole allspice",
    "baby red beets",
    "baby turnips",
    "baby carrots",
    "brussel sprouts",
    "pearl onion",
    "red bliss potato"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/ne_boiled_dinner.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/ne_boiled_dinner_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/ne_boiled_dinner.jpg",
  "tags": [
    tags[0],
    tags[13]
  ]
}, {
  "name": "Pho Bo (Hanoi Beef and Noodle Soup)",
  "id": "pho-bo-hanoi-beef-and-noodle-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/pho-bo-hanoi-beef-and-noodle-soup",
  "cuisine": tags[10],
  "cooking_method": "Broth",
  "ingredients": [
    "oxtails",
    "water",
    "onion",
    "fresh ginger",
    "salt",
    "fish sauce",
    "whole star anise",
    "whole cloves",
    "cinnamon stick",
    "dried bay leaves",
    "onion",
    "mung beans",
    "fresh mint",
    "fresh cilantro",
    "fresh basil",
    "lime",
    "fish sauce",
    "Thai chile pepper",
    "Vietnamese chile sauce",
    "rice vermicelli",
    "beef tenderloin"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/pho_bo_hanoi_beef_and_noodle_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/pho_bo_hanoi_beef_and_noodle_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/pho_bo_hanoi_beef_and_noodle_soup.jpg",
  "tags": [
    tags[10]
  ]
}, {
  "name": "Roast Prime Rib of Beef Au Jus",
  "id": "roast-prime-rib-of-beef-au-jus",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/roast-prime-rib-of-beef-au-jus",
  "cuisine": tags[0],
  "cooking_method": "Roasting",
  "ingredients": [
    "oven ready beef rib roast",
    "salt",
    "ground black pepper",
    "garlic",
    "Mirepoix",
    "Brown Stock"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/roast_prime_rib_of_beef_au_jus.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/roast_prime_rib_of_beef_au_jus_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/roast_prime_rib_of_beef_au_jus.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Salisbury Steak",
  "id": "salisbury-steak",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/salisbury-steak",
  "cuisine": tags[0],
  "cooking_method": "Baking",
  "ingredients": [
    "Mirepoix",
    "olive oil",
    "dried whole thyme",
    "whole marjoram",
    "ground black pepper",
    "salt",
    "corn flake crumbs",
    "eggs",
    "worcestershire sauce",
    "milk",
    "ground beef",
    "Mushroom Sauce"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/salisbury_steak.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/salisbury_steak_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/salisbury_steak.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Swiss Steak",
  "id": "swiss-steak",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/swiss-steak",
  "cuisine": tags[5],
  "cooking_method": "Braising",
  "ingredients": [
    "Beef Bottom Round Steaks (6 oz)",
    "all purpose flour",
    "salt",
    "ground black pepper",
    "vegetable oil",
    "onion",
    "garlic clove",
    "celery",
    "all purpose flour",
    "Brown Stock",
    "tomato purée",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/swiss_steak.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/swiss_steak_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/swiss_steak.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Chorizo",
  "id": "chorizo",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/chorizo",
  "cuisine": tags[14],
  "cooking_method": null,
  "ingredients": [
    "lean pork",
    "fatback",
    "crushed red pepper",
    "garlic",
    "ground cumin",
    "cayenne pepper",
    "salt",
    "paprika",
    "red wine vinegar"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/chorizo.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/chorizo_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/chorizo.jpg",
  "tags": [
    tags[14]
  ]
}, {
  "name": "Home-Style Meatloaf",
  "id": "home-style-meatloaf",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/home-style-meatloaf",
  "cuisine": tags[0],
  "cooking_method": "Baking",
  "ingredients": [
    "onion",
    "celery",
    "garlic",
    "vegetable oil",
    "Fresh Bread Crumbs",
    "tomato juice",
    "ground beef",
    "ground pork",
    "eggs",
    "salt",
    "ground black pepper",
    "fresh parsley",
    "worcestershire sauce",
    "ketchup"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/home-style_meatloaf.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/home-style_meatloaf_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/home-style_meatloaf.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "New England-Style Clam Chowder",
  "id": "new-england-style-clam-chowder",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/new-england-style-clam-chowder",
  "cuisine": "American: New England",
  "cooking_method": "Simmering",
  "ingredients": [
    "canned clams",
    "water",
    "white potato",
    "salt pork",
    "butter",
    "onion",
    "celery",
    "all purpose flour",
    "milk",
    "heavy cream",
    "salt",
    "ground black pepper",
    "tabasco sauce",
    "worcestershire sauce",
    "fresh thyme",
    "fresh parsley",
    "carrot"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/ne-style_clam_chowder.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/ne-style_clam_chowder_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/ne-style_clam_chowder.jpg",
  "tags": [
    tags[0],
    tags[13]
  ]
}, {
  "name": "Posole",
  "id": "posole",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/posole",
  "cuisine": tags[7],
  "cooking_method": "Simmering",
  "ingredients": [
    "pork shoulder",
    "Chicken Stock",
    "canned hominy",
    "onion",
    "garlic",
    "fresh oregano",
    "salt",
    "ground black pepper",
    "cayenne pepper",
    "whole 2 Â½ - 3 Â½ lb chicken",
    "olive oil",
    "chili powder",
    "canned tomatoes",
    "anaheim chile pepper",
    "fresh cilantro",
    "lime",
    "corn tortilla",
    "vegetable oil",
    "romaine lettuce",
    "cider vinegar",
    "onion"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/posole.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/posole_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/posole.jpg",
  "tags": [
    tags[7]
  ]
}, {
  "name": "Roasted Corn Chowder",
  "id": "roasted-corn-chowder",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/roasted-corn-chowder",
  "cuisine": tags[0],
  "cooking_method": "Simmering",
  "ingredients": [
    "fresh corn",
    "milk",
    "salt pork",
    "celery",
    "onion",
    "garlic clove",
    "all purpose flour",
    "Chicken Stock",
    "white potato",
    "heavy cream",
    "worcestershire sauce",
    "fresh thyme",
    "ground nutmeg",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_corn_chowder.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/roasted_corn_chowder_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/roasted_corn_chowder.jpg",
  "tags": [
    tags[0]
  ]
}, {
  "name": "Tomato Sauce",
  "id": "tomato-sauce",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/tomato-sauce",
  "cuisine": tags[5],
  "cooking_method": "Simmering",
  "ingredients": [
    "salt pork",
    "Mirepoix",
    "fresh tomatoes",
    "tomato purée",
    "dried whole thyme",
    "dried bay leaves",
    "garlic clove",
    "fresh parsley",
    "whole black pepper",
    "salt",
    "granulated sugar",
    "White Stock",
    "pork bones"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/tomato_sauce.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/tomato_sauce_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/tomato_sauce.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Fish Fumet",
  "id": "fish-fumet",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/fish-fumet",
  "cuisine": tags[4],
  "cooking_method": "Simmering",
  "ingredients": [
    "butter",
    "onion",
    "fresh parsley",
    "fish bones",
    "dry white wine",
    "Lemon Juice (fresh)",
    "water",
    "medium mushrooms",
    "fresh thyme",
    "lemon"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/fish_fumet.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/fish_fumet_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/fish_fumet.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Fish Stock",
  "id": "fish-stock",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/fish-stock",
  "cuisine": tags[5],
  "cooking_method": "Simmering",
  "ingredients": [
    "Mirepoix",
    "medium mushrooms",
    "Clarified Butter",
    "fish bones",
    "water",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/fish_stock.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/fish_stock_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/fish_stock.jpg",
  "tags": [
    tags[5]
  ]
}, {
  "name": "Fish Velouté",
  "id": "fish-velouta",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/fish-velouta",
  "cuisine": tags[4],
  "cooking_method": "Reduction",
  "ingredients": [
    "butter",
    "all purpose flour",
    "Fish Stock",
    "salt",
    "ground white pepper"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/veloute.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/veloute_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/veloute.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Nuoc Cham (Vietnamese Dipping Sauce)",
  "id": "nuoc-cham-vietnamese-dipping-sauce",
  "url": "http://www.taste.com.au/images/recipes/agt/2006/12/14682_l.jpg",
  "cuisine": tags[15],
  "cooking_method": null,
  "ingredients": [
    "granulated sugar",
    "water",
    "fish sauce",
    "Lemon Juice (fresh)",
    "garlic clove",
    "Thai chile pepper",
    "shallot"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/noc_cham_(vietnamese_dipping_sauce).jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/nuoc_cham_(vietnamese_dipping_sauce)_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/noc_cham_(vietnamese_dipping_sauce).jpg",
  "tags": [
    tags[15]
  ]
}, {
  "name": "Pho Bo (Hanoi Beef and Noodle Soup)",
  "id": "pho-bo-hanoi-beef-and-noodle-soup",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/pho-bo-hanoi-beef-and-noodle-soup",
  "cuisine": tags[10],
  "cooking_method": "Broth",
  "ingredients": [
    "oxtails",
    "water",
    "onion",
    "fresh ginger",
    "salt",
    "fish sauce",
    "whole star anise",
    "whole cloves",
    "cinnamon stick",
    "dried bay leaves",
    "onion",
    "mung beans",
    "fresh mint",
    "fresh cilantro",
    "fresh basil",
    "lime",
    "fish sauce",
    "Thai chile pepper",
    "Vietnamese chile sauce",
    "rice vermicelli",
    "beef tenderloin"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/pho_bo_hanoi_beef_and_noodle_soup.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/pho_bo_hanoi_beef_and_noodle_soup_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/pho_bo_hanoi_beef_and_noodle_soup.jpg",
  "tags": [
    tags[10]
  ]
}, {
  "name": "Shrimp Bisque",
  "id": "shrimp-bisque",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/shrimp-bisque",
  "cuisine": tags[4],
  "cooking_method": "Simmering",
  "ingredients": [
    "Clarified Butter",
    "Mirepoix",
    "shrimp shells",
    "garlic clove",
    "tomato paste",
    "brandy",
    "dry white wine",
    "Fish Velouté",
    "dried bay leaves",
    "dried whole thyme",
    "whole black pepper",
    "fresh parsley",
    "heavy cream",
    "salt",
    "ground white pepper",
    "cayenne pepper",
    "dry sherry wine",
    "16-20 ct shrimp",
    "fresh basil"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/shrimp_bisque.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/shrimp_bisque_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/shrimp_bisque.jpg",
  "tags": [
    tags[4]
  ]
}, {
  "name": "Thai Melon Salsa",
  "id": "thai-melon-salsa",
  "url": "https://api.pearson.com/kitchen-manager/v1/recipes/thai-melon-salsa",
  "cuisine": tags[10],
  "cooking_method": null,
  "ingredients": [
    "honeydew melon",
    "cantaloupe",
    "garlic",
    "light brown sugar",
    "thai fish sauce",
    "serrano chile pepper",
    "Lime Juice (fresh)",
    "unsalted roasted peanuts",
    "fresh mint"
  ],
  "image": "https://api.pearson.com/kitchen-manager/v1/images/full/thai_melon_salsa.jpg",
  "thumb": "https://api.pearson.com/kitchen-manager/v1/images/thumbs/thai_melon_salsa_thumb.jpg",
  "picture": "https://api.pearson.com/kitchen-manager/v1/images/full/thai_melon_salsa.jpg",
  "tags": [
    tags[10]
  ]
}];

dishes = _.map(dishes, function(dish) {
  _.assign(dish, {
    price: Math.floor((Math.random() * 100) + 10)
  });
  dish.description = chance.paragraph();
  return new Dish(dish);
});
// dishes = dishes.map(function(dish){
//     return new Dish(dish);
// });

var orders = [];


var carts = [];


//<-----USERS---->//
var numUsers = 100;
var status = "busy online offline".split(' ');
var dishesStack = _.slice(dishes);
var addresses = [];

var address = [
  [{
    street: '5 Hanover Square',
    city: 'New York',
    state: 'NY',
    zip: 10004
  }, 40.70508, -74.00916],
  [{
    street: '754 Metropolitan Ave',
    city: 'Brooklyn',
    state: 'NY',
    zip: 11211
  }, 40.70934, -73.95656],
  [{
    street: '1299 McCarter Hwy',
    city: 'Newark',
    state: 'NJ',
    zip: 07104
  }, 40.77585, -74.16510],
  [{
    street: '44 W 17th St',
    city: 'New York',
    state: 'NY',
    zip: 10011
  }, 40.73864, -73.99451],
  [{
    street: '148 W 4th St',
    city: 'New York',
    state: 'NY',
    zip: 10012
  }, 40.72506, -73.99769]
];

var emails = chance.unique(randEmail, numUsers);

function randEmail(){
  return chance.email({
  domain: 'example.com'
});
}

function randDate(){
  var month = Math.floor(Math.random()*8);
  return chance.date({month: month, year: 2015});
}

var users = _.times(numUsers, randUser);
function randUser() {
  var gender = chance.gender();
  var pickDishes = dishesStack.pop();
  var favoriteDish = dishes[Math.floor(Math.random() * (dishes.length - 1))];
  var badDish = dishes[Math.floor(Math.random() * (dishes.length - 1))];
  var addressIndex = Math.floor(Math.random() * (address.length - 1));
  var newAddress = new Address(address[addressIndex][0]);
  addresses.push(newAddress);
  var newUser = new User({
    name: {
      first: chance.first({
        gender: gender.toLowerCase()
      }),
      last: chance.last()
    },
    address: {
      shipping: newAddress,
      lat: address[addressIndex][1],
      lng: address[addressIndex][2]
    },
    picture: randPhoto(gender),
    email: emails.pop(),
    password: chance.word(),
    status: status[chance.natural({
      min: 0,
      max: 3
    })],
    isAdmin: false,
    favorites: [favoriteDish],
    description: 'I am ' + chance.paragraph()
  });

  if (!!pickDishes) newUser.dishes = [pickDishes];

  var quantity = Math.floor(Math.random() * 5) + 1;

  var newGoodOrder = new Order({
    user: newUser,
    dishes: [{
      dishId: favoriteDish,
      quantity: quantity,
      total: quantity * favoriteDish.price
    }],
    date : randDate()
  });

  var newBadOrder = new Order({
    user: newUser,
    dishes: [{
      dishId: badDish,
      quantity: quantity,
      total: quantity * badDish.price
    }],
    date: randDate()
  });

  var newReviews = randReview(favoriteDish, badDish, newUser);

  newUser.orders = [newGoodOrder, newBadOrder];
  orders = _.union(orders, [newGoodOrder, newBadOrder]);
  newUser.reviews = newReviews;
  return newUser;
}

function randPhoto(gender) {
  var pickGender = {
    Male: "men",
    Female: "women"
  };
  var g = pickGender[gender];
  var n = chance.natural({
    min: 0,
    max: 96
  });
  return 'http://api.randomuser.me/portraits/thumb/' + g + '/' + n + '.jpg';
}

function randReview(favoriteDish, badDish, user) {
  var newGoodReview = new Review({
    description: favoriteDish.name + ' is ' + chance.paragraph(),
    user: user,
    dish: favoriteDish,
    rating: chance.natural({
      min: 4,
      max: 5
    }),
    date: randDate()
  });


  var newBadReview = new Review({
    description: badDish.name + ' is ' + chance.paragraph(),
    user: user,
    dish: badDish,
    rating: 2,
    date: randDate()
  });


  if (favoriteDish.rating) {
    favoriteDish.rating = ((favoriteDish.rating * favoriteDish.reviews.length) + newGoodReview.rating) / (favoriteDish.reviews.length + 1);
  } else {
    favoriteDish.rating = newGoodReview.rating;
  }
  if (badDish.rating) {
    badDish.rating = ((badDish.rating * badDish.reviews.length) + newBadReview.rating) / (badDish.reviews.length + 1);
  } else {
    badDish.rating = newBadReview.rating;
  }

  favoriteDish.reviews.push(newGoodReview);
  badDish.reviews.push(newBadReview);

  reviews = reviews.concat(newGoodReview).concat(newBadReview);
  return [newGoodReview, newBadReview];
}

//update dishes rating


var models = [User, Address, Dish, Order, Review, Tag];
var data = [users, addresses, dishes, orders, reviews, tags];


var wipeDB = function() {
  models.forEach(function(model) {
    model.find({}).remove(function() {});
  });

  return q.resolve();
};

var seed = function() {
  var promiseArr = models.map(function(currModel, index) {
    return currModel.create(data[index]);
  });
  q.all(promiseArr)
    .then(function(data) {
      console.log("database seeded!");
      process.kill(0)
    })
    .then(function(err) {
      console.log("error! is: ", err.message);
      process.kill(0);
    });
};

connectToDb
// .then(function() {
//     wipeDB())
  .then(function() {
    seed();
  })
  .then(null, function(err) {
    console.error(err);
  });
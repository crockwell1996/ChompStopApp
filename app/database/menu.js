const menu = () => {
  return {
    appetizers: [
      {
        title: 'Chicken Bites',
        description: 'Small yet tasty chicken bites.',
        calories: '200',
        price: '3.99',
        imageRef: require('../images/wings.png'),
      },
      {
        title: 'Sauce Dippers',
        description: 'Deep-friend cheese sticks.',
        calories: '350',
        price: '4.49',
        imageRef: require('../images/sauce-dippers.png'),
      },
      {
        title: '10 Wing Basket',
        description:
          'Your choice of 10 Wings. Served with Carrots/Celery and Ranch/Blue Cheese. Also served with Fries.',
        calories: '1120',
        price: '14.09',
        imageRef: require('../images/wings-n-fries.png'),
      },
    ],
    sandwiches: [
      {
        title: 'Chicken Sandwich',
        description:
          'Our Chicken Sandwich is served on a white bun, 2 pickles, butter, and a 100% white meat with no hormones ever.',
        calories: '520',
        price: '4.09',
        imageRef: require('../images/chicken-sandwich.png'),
      },
      {
        title: 'The Big Burger',
        description:
          'Our quarter-lb burger comes with lettuce, cheese, tomato, and your choice of condiments. Served with fries.',
        calories: '800',
        price: '10.99',
        imageRef: require('../images/big-burger.png'),
      },
      {
        title: 'The Vegan Burger',
        description:
          'Our Vegan Friendly burger is sure to wow you! Served on a yeast bun, lettuce, tomato, and your choice of sauce.',
        calories: '780',
        price: '8.99',
        imageRef: require('../images/impossible_burger.png'),
      },
    ],
    sides: [
      {
        title: 'Fries',
        description:
          'A classic take, our Waffle Potato Fries are cooked in canola oil and lightly salted in sea salt.',
        calories: '390',
        price: '2.09',
        imageRef: require('../images/fries.png'),
      },
      {
        title: 'Sweet Potato Fries',
        description:
          'Crinkle-Cut Sweet Potato Fries with your choice of sauce.',
        calories: '410',
        price: '3.49',
        imageRef: require('../images/sweet-pot-fried.png'),
      },
    ],
    drinks: [
      {
        title: 'Coca-Cola',
        description: 'A Refreshing serving of classic Coca-Cola.',
        calories: '320',
        price: '1.89',
        imageRef: require('../images/cfa_coke.png'),
      },
      {
        title: 'Lemonade',
        description: 'Small, Medium, Large. Same price.',
        calories: '100-400',
        price: '1.99',
        imageRef: require('../images/lemonade.png'),
      },
      {
        title: 'Sweet Tea',
        description: 'Southern and sweet.',
        calories: '200',
        price: '0.99',
        imageRef: require('../images/sweet-tea.png'),
      },
      {
        title: 'Iced Coffee',
        description:
          'A rich Caramel drizzle in our Coffee House Blend, served on Ice.',
        calories: '450',
        price: '2.99',
        imageRef: require('../images/coffee.png'),
      },
    ],
  };
};

export default menu;

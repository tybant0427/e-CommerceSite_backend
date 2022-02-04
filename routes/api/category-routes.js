const router = require('express').Router();
const { Category, Product } = require('../../models');


//   // find all categories
  router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
        ]
      })
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
        
 //find one category by ID 
router.get('/:id', (req, res) => {
  
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id'}); 
        return; 
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new category 
router.post('/', (req, res) => {
  
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
  });
});

//update category 
router.put('/:id', (req, res) => {
 
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(categoryData => {
        if (!categoryData[0]) {
            res.status(404).json({ message: 'No category found with this id'});
            return;
        }
        res.json(categoryData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});

// delete a category 
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

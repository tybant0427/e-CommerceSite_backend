const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
       ]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get tag by ID
router.get('/:id', (req, res) => {
 
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update tag
router.put('/:id', (req, res) => {
  
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(tagData => {
        if (!tagData[0]) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(tagData);
  })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
  });

});


//delete tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(taggData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

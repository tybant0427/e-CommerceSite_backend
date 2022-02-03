const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });
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


// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Product.findByPk(req.params.id, {
      
      include: [
        {
          model: Product
          
        },
       
      ]
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', (req, res) => {
//   // create a new tag
// });
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
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


// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });
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

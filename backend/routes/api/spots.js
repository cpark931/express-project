router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(201).json(spot);
  });

  router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
      include: [{ model: SpotImage, attributes: ['url'] }]
    });

    res.json({ spots });
  });

  router.get('/:id', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id, {
      include: [{ model: SpotImage }]
    });

    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }

    res.json(spot);
  });

  router.put('/:id', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }

    if (req.user.id !== spot.ownerId) {
      const err = new Error('Unauthorized');
      err.status = 403;
      return next(err);
    }

    await spot.update({ address, city, state, country, lat, lng, name, description, price });

    res.json(spot);
  });

  router.delete('/:id', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }

    if (req.user.id !== spot.ownerId) {
      const err = new Error('Unauthorized');
      err.status = 403;
      return next(err);
    }

    await spot.destroy();
    res.json({ message: 'Spot deleted successfully' });
  });

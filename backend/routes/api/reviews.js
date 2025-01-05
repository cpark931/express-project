router.post('/:spotId', requireAuth, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }

    const existingReview = await Review.findOne({
      where: { spotId, userId: req.user.id }
    });

    if (existingReview) {
      const err = new Error('Review already exists for this spot');
      err.status = 403;
      return next(err);
    }

    const newReview = await Review.create({
      spotId,
      userId: req.user.id,
      review,
      stars
    });

    res.status(201).json(newReview);
  });

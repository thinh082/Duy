'use strict';

const { Router } = require('express');
const homeController = require('../controllers/home.controller');
const healthController = require('../controllers/health.controller');
const adminRoutes = require('./admin');

const router = Router();

router.get('/', homeController.index);
router.get('/health/db', healthController.db);

router.use('/admin', adminRoutes);

module.exports = router;



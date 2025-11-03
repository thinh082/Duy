'use strict';

const { Router } = require('express');
const adminController = require('../controllers/admin.controller');
const tk = require('../controllers/taikhoan.controller');
const dh = require('../controllers/donhang.controller');

const router = Router();

// Dashboard
router.get('/', adminController.index);

// TaiKhoan CRUD
router.get('/taikhoan', tk.list);
router.get('/taikhoan/create', tk.createForm);
router.post('/taikhoan/create', tk.create);
router.get('/taikhoan/:id/edit', tk.editForm);
router.post('/taikhoan/:id/edit', tk.update);
router.post('/taikhoan/:id/delete', tk.remove);

// DonHang CRUD
router.get('/donhang', dh.list);
router.get('/donhang/create', dh.createForm);
router.post('/donhang/create', dh.create);
router.get('/donhang/:id/edit', dh.editForm);
router.post('/donhang/:id/edit', dh.update);
router.post('/donhang/:id/delete', dh.remove);

module.exports = router;



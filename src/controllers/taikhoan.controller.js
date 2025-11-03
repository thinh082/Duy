'use strict';

const { getPool, sql } = require('../config/db');

exports.list = async (req, res, next) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT Id, TenDangNhap, HoTen, Email, NgayTao FROM TaiKhoan ORDER BY Id DESC');
    return res.status(200).render('admin/taikhoan/list', {
      title: 'Quản lý Tài khoản',
      rows: result.recordset || []
    });
  } catch (err) {
    return next(err);
  }
};

exports.createForm = (req, res) => {
  return res.status(200).render('admin/taikhoan/form', {
    title: 'Thêm tài khoản',
    data: { TenDangNhap: '', MatKhau: '', HoTen: '', Email: '' },
    action: 'create'
  });
};

exports.create = async (req, res, next) => {
  const { TenDangNhap, MatKhau, HoTen, Email } = req.body;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('TenDangNhap', sql.NVarChar(255), TenDangNhap);
    request.input('MatKhau', sql.NVarChar(255), MatKhau);
    request.input('HoTen', sql.NVarChar(255), HoTen);
    request.input('Email', sql.NVarChar(255), Email);
    await request.query('INSERT INTO TaiKhoan (TenDangNhap, MatKhau, HoTen, Email, NgayTao) VALUES (@TenDangNhap, @MatKhau, @HoTen, @Email, GETDATE())');
    return res.redirect('/admin/taikhoan');
  } catch (err) {
    return next(err);
  }
};

exports.editForm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('Id', sql.Int, Number(id));
    const result = await request.query('SELECT Id, TenDangNhap, HoTen, Email FROM TaiKhoan WHERE Id=@Id');
    const row = result.recordset?.[0];
    if (!row) return res.status(404).render('error', { title: 'Không tìm thấy', message: 'Không tìm thấy tài khoản' });
    return res.status(200).render('admin/taikhoan/form', {
      title: 'Cập nhật tài khoản',
      data: { ...row, MatKhau: '' },
      action: 'edit'
    });
  } catch (err) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { TenDangNhap, MatKhau, HoTen, Email } = req.body;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('Id', sql.Int, Number(id));
    request.input('TenDangNhap', sql.NVarChar(255), TenDangNhap);
    request.input('HoTen', sql.NVarChar(255), HoTen);
    request.input('Email', sql.NVarChar(255), Email);
    if (MatKhau && MatKhau.trim().length > 0) {
      request.input('MatKhau', sql.NVarChar(255), MatKhau);
      await request.query('UPDATE TaiKhoan SET TenDangNhap=@TenDangNhap, MatKhau=@MatKhau, HoTen=@HoTen, Email=@Email WHERE Id=@Id');
    } else {
      await request.query('UPDATE TaiKhoan SET TenDangNhap=@TenDangNhap, HoTen=@HoTen, Email=@Email WHERE Id=@Id');
    }
    return res.redirect('/admin/taikhoan');
  } catch (err) {
    return next(err);
  }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('Id', sql.Int, Number(id));
    await request.query('DELETE FROM TaiKhoan WHERE Id=@Id');
    return res.redirect('/admin/taikhoan');
  } catch (err) {
    return next(err);
  }
};



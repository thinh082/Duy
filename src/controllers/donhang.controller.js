'use strict';

const { getPool, sql } = require('../config/db');

exports.list = async (req, res, next) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(
      'SELECT d.Id, d.IdTaiKhoan, d.MaDonHang, d.TongTien, d.NgayDat, d.TrangThai, t.TenDangNhap FROM DonHang d LEFT JOIN TaiKhoan t ON d.IdTaiKhoan=t.Id ORDER BY d.Id DESC'
    );
    return res.status(200).render('admin/donhang/list', {
      title: 'Quản lý Đơn hàng',
      rows: result.recordset || []
    });
  } catch (err) {
    return next(err);
  }
};

exports.createForm = async (req, res, next) => {
  try {
    const pool = await getPool();
    const users = await pool.request().query('SELECT Id, TenDangNhap FROM TaiKhoan ORDER BY TenDangNhap');
    return res.status(200).render('admin/donhang/form', {
      title: 'Thêm đơn hàng',
      users: users.recordset || [],
      data: { IdTaiKhoan: '', MaDonHang: '', TongTien: '', NgayDat: '', TrangThai: '' },
      action: 'create'
    });
  } catch (err) { return next(err); }
};

exports.create = async (req, res, next) => {
  const { IdTaiKhoan, MaDonHang, TongTien, NgayDat, TrangThai } = req.body;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('IdTaiKhoan', sql.Int, Number(IdTaiKhoan));
    request.input('MaDonHang', sql.NVarChar(255), MaDonHang);
    request.input('TongTien', sql.Decimal(18, 2), Number(TongTien));
    request.input('NgayDat', sql.DateTime2, NgayDat ? new Date(NgayDat) : new Date());
    request.input('TrangThai', sql.NVarChar(100), TrangThai);
    await request.query('INSERT INTO DonHang (IdTaiKhoan, MaDonHang, TongTien, NgayDat, TrangThai) VALUES (@IdTaiKhoan, @MaDonHang, @TongTien, @NgayDat, @TrangThai)');
    return res.redirect('/admin/donhang');
  } catch (err) { return next(err); }
};

exports.editForm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('Id', sql.Int, Number(id));
    const [orderRes, usersRes] = await Promise.all([
      request.query('SELECT Id, IdTaiKhoan, MaDonHang, TongTien, NgayDat, TrangThai FROM DonHang WHERE Id=@Id'),
      pool.request().query('SELECT Id, TenDangNhap FROM TaiKhoan ORDER BY TenDangNhap')
    ]);
    const row = orderRes.recordset?.[0];
    if (!row) return res.status(404).render('error', { title: 'Không tìm thấy', message: 'Không tìm thấy đơn hàng' });
    return res.status(200).render('admin/donhang/form', {
      title: 'Cập nhật đơn hàng',
      users: usersRes.recordset || [],
      data: row,
      action: 'edit'
    });
  } catch (err) { return next(err); }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  const { IdTaiKhoan, MaDonHang, TongTien, NgayDat, TrangThai } = req.body;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('Id', sql.Int, Number(id));
    request.input('IdTaiKhoan', sql.Int, Number(IdTaiKhoan));
    request.input('MaDonHang', sql.NVarChar(255), MaDonHang);
    request.input('TongTien', sql.Decimal(18, 2), Number(TongTien));
    request.input('NgayDat', sql.DateTime2, NgayDat ? new Date(NgayDat) : new Date());
    request.input('TrangThai', sql.NVarChar(100), TrangThai);
    await request.query('UPDATE DonHang SET IdTaiKhoan=@IdTaiKhoan, MaDonHang=@MaDonHang, TongTien=@TongTien, NgayDat=@NgayDat, TrangThai=@TrangThai WHERE Id=@Id');
    return res.redirect('/admin/donhang');
  } catch (err) { return next(err); }
};

exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    const request = pool.request();
    request.input('Id', sql.Int, Number(id));
    await request.query('DELETE FROM DonHang WHERE Id=@Id');
    return res.redirect('/admin/donhang');
  } catch (err) { return next(err); }
};



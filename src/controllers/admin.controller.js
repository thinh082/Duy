'use strict';

exports.index = (req, res) => {
  return res.status(200).render('admin/index', {
    title: 'Admin Dashboard',
  });
};



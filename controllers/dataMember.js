const DataMember = require('../models/dataMember');

exports.uploadData = (req, res, next) => {
    DataMember.findOne({
        where: {
            id_data_member: req.params.iddata
        }
    })
        .then((dataMember) => {
            if (!dataMember) {
                return res.status(401).json({ error: 'Not found' });
            } else {
                res.status(200).json(dataMember);
            }
        })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
}

exports.updateData = (req, res, next) => {
    DataMember.update(
        {
            username: req.body.username,
            birth_date: req.body.birth_date === '' ? null : req.body.birth_date,
            surname: req.body.surname,
            firstname: req.body.firstname,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            postal_code: req.body.postal_code,
            city: req.body.city,
            updated_at: req.body.updated_at
        }, {
        where: {
            id_data_member: req.params.iddata
        }
    }).then(
        () => {
            res.status(201).json({
                message: 'Data updated successfully'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}


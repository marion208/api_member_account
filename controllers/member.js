const Member = require('../models/member');
const DataMember = require('../models/dataMember');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createMember = async (req, res, next) => {
    if (req.body.password.trim() != '' && req.body.email_address.trim != '') {
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        const member = new Member({
            email_address: req.body.email_address,
            password: passwordHashed
        })
        member.save().then(
            member => {
                const dataMember = new DataMember({
                    id_join_member: member.id_member
                });
                dataMember.save().then(
                    dataMember => {
                        res.status(201).json({
                            message: 'New member added',
                            id_member: member.id_member,
                            id_data_member: dataMember.id_data_member,
                            token: jwt.sign(
                                { memberId: member.id_member },
                                process.env.KEY_TOKEN,
                                { expiresIn: '24h' }
                            )
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        )
    } else {
        res.status(400).json({
            message: 'Invalid information'
        });
    }
};

exports.login = (req, res, next) => {
    Member.findOne({
        where: {
            email_address: req.body.email_address
        }
    })
        .then(member => {
            if (!member) {
                return res.status(401).json({ error: 'User not found' });
            }
            bcrypt.compare(req.body.password, member.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong password' });
                    }
                    DataMember.findOne({
                        where: {
                            id_join_member: member.id_member
                        }
                    }).then(dataMember => {
                        if (!dataMember) {
                            return res.status(401).json({ error: 'Data user not found' });
                        }
                        res.status(200).json({
                            id_member: member.id_member,
                            id_data_member: dataMember.id_data_member,
                            token: jwt.sign(
                                { memberId: member.id_member },
                                process.env.KEY_TOKEN,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.deleteMember = (req, res, next) => {
    DataMember.destroy({
        where: {
            id_join_member: req.params.idmember
        }
    }).then(
        () => {
            Member.destroy({
                where: {
                    id_member: req.params.idmember
                }
            }).then(
                () => {
                    res.status(200).json({
                        message: 'Deleted!'
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

const express = require('express');
const RegionRouter = express.Router();
const { regionValidation } = require('../validation/region.validation');

const {
    postRegion,
    getRegions,
    getRegionById,
    updateRegion,
    deleteRegion,
    searchRegion
} = require('../controller/region.controller');

const validateRegion = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Xatolik yuz berdi",
                error: error.message
            });
        }
        next();
    };
};

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Regions uchun API endpointlari
 */

/**
 * @swagger
 * /api/regions/postRegion/:
 *   post:
 *     summary: Yangi regions yaratish
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Regions yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
RegionRouter.post('/postRegion', validateRegion(regionValidation), postRegion);

/**
 * @swagger
 * /api/regions/getRegions/:
 *   get:
 *     summary: Regions ro‘yxatini olish
 *     tags: [Regions]
 *     responses:
 *       '200':
 *         description: Regions ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
RegionRouter.get('/getRegions', getRegions);

/**
 * @swagger
 * /api/regions/getRegionById/{id}:
 *   get:
 *     summary: Regions elementini ID bo‘yicha olish
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Regions topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
RegionRouter.get('/getRegionById/:id', getRegionById);

/**
 * @swagger
 * /api/regions/updateRegion/{id}:
 *   put:
 *     summary: Regions elementini yangilash
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Regions yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
RegionRouter.put('/updateRegion/:id', validateRegion(regionValidation), updateRegion);

/**
 * @swagger
 * /api/regions/searchRegion/:
 *   get:
 *     summary: Regions bo‘yicha qidirish
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijasi
 *       '400':
 *         description: Qidiruv so‘rovi noto‘g‘ri
 */
RegionRouter.get('/searchRegion', searchRegion);

/**
 * @swagger
 * /api/regions/deleteRegion/{id}:
 *   delete:
 *     summary: Regions elementini o‘chirish
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Regions o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
RegionRouter.delete('/deleteRegion/:id', deleteRegion);

module.exports = RegionRouter;
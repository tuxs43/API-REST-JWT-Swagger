import { Router } from 'express';
import { listarMesas, obtenerMesa, crearMesa, actualizarMesa, desactivarMesa } from '../controllers/mesaController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { requireAdmin } from '../middlewares/roleMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/mesas:
 *   get:
 *     summary: Listar mesas disponibles
 *     tags: [Mesas]
 *     parameters:
 *       - in: query
 *         name: disponible
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: Lista de mesas
 */
router.get('/', listarMesas);

/**
 * @openapi
 * /api/mesas/{id}:
 *   get:
 *     summary: Obtener una mesa por ID
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle de la mesa
 */
router.get('/:id', obtenerMesa);

/**
 * @openapi
 * /api/mesas:
 *   post:
 *     summary: Crear una nueva mesa (solo Admin)
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [numero, capacidad]
 *             properties:
 *               numero:
 *                 type: integer
 *               capacidad:
 *                 type: integer
 *               ubicacion:
 *                 type: string
 *               disponible:
 *                 type: boolean
 *           example:
 *             numero: 10
 *             capacidad: 4
 *             ubicacion: Patio
 *             disponible: true
 *     responses:
 *       201:
 *         description: Mesa creada
 */
router.post('/', verifyToken, requireAdmin, crearMesa);

/**
 * @openapi
 * /api/mesas/{id}:
 *   put:
 *     summary: Actualizar una mesa (solo Admin)
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *               capacidad:
 *                 type: integer
 *               ubicacion:
 *                 type: string
 *               disponible:
 *                 type: boolean
 *           example:
 *             numero: 11
 *             capacidad: 6
 *             ubicacion: Patio
 *             disponible: true
 *     responses:
 *       200:
 *         description: Mesa actualizada
 */
router.put('/:id', verifyToken, requireAdmin, actualizarMesa);

/**
 * @openapi
 * /api/mesas/{id}:
 *   delete:
 *     summary: Desactivar una mesa (solo Admin)
 *     tags: [Mesas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Mesa desactivada
 */
router.delete('/:id', verifyToken, requireAdmin, desactivarMesa);

export default router;

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: Aktualny kurs walut
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               PLN: 4.20
 *               USD: 1.10
 *               EUR: 1.00
 *               CHF: 1.15
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logowanie użytkownika
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pomyślnie zalogowano użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pomyślnie zalogowano użytkownika
 *       401:
 *         description: Nieprawidłowa nazwa użytkownika lub hasło
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Nieprawidłowa nazwa użytkownika lub hasło
 *       500:
 *         description: Wewnętrzny błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Wewnętrzny błąd serwera
 */
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Rejestracja użytkownika
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pomyślnie zarejestrowano użytkownika
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pomyślnie zarejestrowano użytkownika
 *       400:
 *         description: Użytkownik o podanej nazwie użytkownika lub adresie e-mail już istnieje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Użytkownik o podanej nazwie użytkownika lub adresie e-mail już istnieje
 *       500:
 *         description: Wewnętrzny błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Wewnętrzny błąd serwera
 */
/**
 * @swagger
 * /zalogowany:
 *   get:
 *     summary: Strona dla zalogowanych użytkowników
 *     tags:
 *       - LoggedIn
 *     responses:
 *       200:
 *         description: Pomyślnie zwrócono stronę dla zalogowanych użytkowników
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: HTML content of the logged-in page
 *       404:
 *         description: Nie znaleziono żądanej strony
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Nie znaleziono żądanej strony
 */
/**
 * @swagger
 * /save-form:
 *   post:
 *     summary: Zapisywanie formularza
 *     tags:
 *       - Forms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pomyślnie zapisano formularz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pomyślnie zapisano formularz
 *       500:
 *         description: Wewnętrzny błąd serwera
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Wewnętrzny błąd serwera
 */

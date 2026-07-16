# 💱 Kantor Internetowy - Aplikacja Wymiany Walut

## 📄 Opis projektu

**Kantor Internetowy** to pełnoprawna aplikacja webowa umożliwiająca użytkownikom wymianę walut online w czasie rzeczywistym. System został zaprojektowany z myślą o bezpieczeństwie, użyteczności i przejrzystości interfejsu. Aplikacja integruje się z zewnętrznymi API, takimi jak **PayU** oraz **ExchangeRate-API**, umożliwiając automatyczne przeliczanie kursów i realizację płatności.

System obsługuje funkcje takie jak:
- Rejestracja i logowanie z autoryzacją JWT
- Aktualne kursy walut
- Wymiana walut online
- Obsługa płatności przez PayU
- Formularz kontaktowy z zapisem do plików i MongoDB
- Panel użytkownika z możliwością zmiany hasła i podglądem salda
- Dokumentacja API za pomocą Swagger

---

## 🛠 Technologie

- **Node.js & Express.js** – backend serwera
- **MongoDB** – baza danych użytkowników i płatności
- **Mongoose** – modelowanie danych
- **JWT (JSON Web Tokens)** – bezpieczna autoryzacja użytkowników
- **PayU API** – obsługa płatności
- **ExchangeRate-API** – pozyskiwanie aktualnych kursów walut
- **Swagger UI** – dokumentacja i testowanie API
- **HTML/CSS/JavaScript** – frontend aplikacji

---

## 🚀 Funkcjonalności

1. **Rejestracja i logowanie**  
   - Bezpieczne logowanie z tokenem JWT  
   - Walidacja hasła zgodnie z wymaganiami bezpieczeństwa

2. **Wymiana walut**  
   - Pobieranie aktualnych kursów z ExchangeRate-API  
   - Możliwość konwersji walut z poziomu aplikacji

3. **Panel użytkownika**  
   - Podgląd profilu, salda w USD i EUR  
   - Zmiana hasła  
   - Wylogowanie użytkownika

4. **System płatności PayU**  
   - Użytkownik podaje dane karty, wybiera walutę i kwotę  
   - Dane są kodowane i zapisywane w bazie  
   - Saldo użytkownika aktualizowane po transakcji

5. **Formularz kontaktowy**  
   - Dane zapisywane do plików tekstowych i/lub bazy danych  
   - Walidacja i reset formularza po wysłaniu

6. **Wyszukiwanie walut**  
   - Dynamiczne filtrowanie dostępnych walut na liście

7. **Swagger API**  
   - Endpointy `/register`, `/login`, `/rates`, `/save-form` oraz inne udokumentowane z pomocą Swaggera

---

## ⚙️ Uruchomienie aplikacji

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/nazwa-uzytkownika/kantor-internetowy.git
cd kantor-internetowy
```

### 2. Zainstaluj zależności
```bash
npm install
```

### 3. Uruchom lokalnie MongoDB
Upewnij się, że MongoDB działa na `mongodb://localhost:27017/REST_Swagger_Payu`

### 4. Uruchom aplikację
```bash
node server.js
```
Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

### 5. Sprawdź dokumentację API
```bash
http://localhost:3000/api-docs
```

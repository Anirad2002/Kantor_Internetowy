<div align="center">
  <h1>💱 Kantor Internetowy</h1>
  <p><strong>Nowoczesna platforma do wymiany walut online z integracją płatności PayU</strong></p>
</div>

---

## 📖 Spis treści

- [O projekcie](#o-projekcie)
- [Główne funkcjonalności](#główne-funkcjonalności)
- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)
- [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
- [Dokumentacja API](#dokumentacja-api)
- [Perspektywy rozwoju](#perspektywy-rozwoju)
- [Autor](#autor)

---

## 🎯 O projekcie

**Kantor Internetowy** — to pełnoprawna aplikacja webowa do wymiany walut w czasie rzeczywistym. Projekt umożliwia użytkownikom rejestrację, śledzenie aktualnych kursów walut, dokonywanie wymian oraz realizację płatności online za pomocą **PayU**.

Aplikacja została stworzona jako duży projekt studencki, demonstrujący umiejętności budowania kompletnego rozwiązania **full-stack** z bezpieczną autoryzacją JWT, integracją zewnętrznych API oraz dokumentacją Swagger.

---

## ✨ Główne funkcjonalności

- ✅ Rejestracja i logowanie z autoryzacją **JWT**
- ✅ Pobieranie aktualnych kursów walut z **ExchangeRate-API**
- ✅ Wymiana walut i aktualizacja salda użytkownika
- ✅ Integracja płatności online **PayU**
- ✅ Panel użytkownika (profil, saldo, historia, zmiana hasła)
- ✅ Formularz kontaktowy z zapisem do MongoDB
- ✅ Dynamiczne wyszukiwanie walut
- ✅ Pełna dokumentacja API przez **Swagger UI**

---

## 🛠️ Technologie

| Technologia          | Opis                              |
|----------------------|-----------------------------------|
| **Node.js**          | Środowisko uruchomieniowe         |
| **Express.js**       | Framework aplikacji webowej       |
| **MongoDB**          | Baza danych                       |
| **Mongoose**         | Modelowanie danych                |
| **JWT**              | Autoryzacja użytkowników          |
| **PayU API**         | Obsługa płatności                 |
| **ExchangeRate-API** | Aktualne kursy walut              |
| **Swagger**          | Dokumentacja API                  |
| **EJS + Vanilla JS** | Frontend                          |

---

## 📁 Struktura projektu

```
Kantor_Internetowy/
├── server.js                 # Główny plik serwera (uruchomienie aplikacji)
├── app.js                    # Konfiguracja aplikacji Express
├── swagger.js                # Konfiguracja i inicjalizacja Swagger UI
├── token.js                  # Logika generowania i weryfikacji JWT
├── register.js               # Obsługa rejestracji użytkownika
├── login.js                  # Obsługa logowania
├── profile.js                # Zarządzanie profilem użytkownika
├── formularz.js              # Obsługa formularza kontaktowego
├── payuserver.js             # Integracja z PayU
├── user.model.js             # Model użytkownika w MongoDB
├── form.model.js             # Model formularza kontaktowego
├── payu.model.js             # Model płatności PayU
├── countires.js              # Dane walut i krajów
├── dane.json                 # Dane pomocnicze
├── public/                   # Frontend - statyczne pliki
│   ├── img/                  # Zdjęcia i ikony
│   ├── kontakt/              # Strony związane z kontaktem
│   ├── login/                # Strony logowania
│   ├── payu/                 # Strony związane z płatnościami PayU
│   ├── profile/              # Panel profilu użytkownika
│   ├── register/             # Strony rejestracji
│   ├── zalogowany/           # Strony dla zalogowanych użytkowników
│   ├── index.html            # Główna strona
│   ├── script.js             # Główny skrypt JavaScript
│   └── styles.css            # Główne style CSS
├── package.json              # Zależności projektu
└── README.md                 # Dokumentacja projektu
```

---

## 🚀 Instalacja i uruchomienie

### Wymagania

- [Node.js](https://nodejs.org) ≥ 18
- [MongoDB](https://www.mongodb.com/try/download/terraform-provider) [(lokalnie lub MongoDB Atlas)](https://www.mongodb.com/products/platform/atlas-database)

### Kroki

# 1. Sklonuj repozytorium
```
git clone https://github.com/Anirad2002/Kantor_Internetowy.git
cd Kantor_Internetowy
```

# 2. Zainstaluj zależności
```
npm install
```

# 3. Skonfiguruj zmienne środowiskowe (.env)
#    (port, URI MongoDB, klucze JWT, PayU, ExchangeRate-API)

# 4. Uruchom MongoDB

# 5. Uruchom aplikację
```
node server.js
```
Aplikacja będzie dostępna pod adresem: ``` http://localhost:3000 ```

---

## 🔮 Perspektywy rozwoju

- [ ] Przejście frontend na React + TypeScript
- [ ] Dodanie WebSocket dla kursów walut w czasie rzeczywistym
- [ ] Implementacja dwóch kierunków wymiany (kupno/sprzedaż)
- [ ] Panel administracyjny
- [ ] Testy jednostkowe (Jest)
- [ ] Deploy na Render / Railway / Vercel

---

## 👤 Autor

**Daryna Pasiura**

---

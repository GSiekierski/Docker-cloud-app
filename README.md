# Docker-cloud-app

## Temat projektu
Webowa aplikacja do zarządzania użytkownikami, projektami oraz zadaniami  

## Autorzy
- Grzegorz Siekierski, nr indeksu: 55206 
- Maciej Płoskonka, nr indeksu: 52636
- Igor Rej, nr indeksu: 51272

## Funkcjonalności
### Zarządzanie użytkownikami
- dodawanie użytkownika
- edycja danych użytkownika
- usuwanie użytkownika
- wyświetlanie listy użytkowników

### Zarządzanie projektami
- dodawanie projektu
- edycja projektu
- usuwanie projektu
- wyświetlanie listy projektów

### Zarządzanie zadaniami
- dodawanie zadania
- edycja zadania
- usuwanie zadania
- oznaczanie zadania jako wykonane
- przypisywanie zadania do użytkownika i projektu

## Architektura aplikacji
Projekt składa się z dwóch kontenerów:
### `app` – aplikacja:
- backend: Node.js + Express
- frontend: EJS
### `db` – baza danych PostgreSQL
- Konteneryzacja: Docker + Docker Compose

## Uruchomienie projektu

### Wymagania
Zainstalowany Docker

### Instrukcja uruchomienia
- W katalogu głównym projektu wykonać polecenie:

```bash
docker compose up --build
```
- Po uruchomienu aplikacja będzie dostępna pod adresem:
localhost:3000/

- Zatrzymanie aplikacji
```bash
docker compose down
```
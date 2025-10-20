# Bäckerei Einsiedler - Website

Offizielle Website der Bäckerei Einsiedler in Haldenwang.

## Übersicht

Diese Website wurde mit reinem HTML, CSS und JavaScript erstellt - ohne externe Abhängigkeiten oder Frameworks. Sie ist einfach zu warten und kann auf jedem Webserver gehostet werden.

## Struktur

```
bakery-website/
├── index.html          # Startseite
├── history.html        # Geschichte der Bäckerei
├── people.html         # Team-Mitglieder
├── bread.html          # Brotsorten
├── impressum.html      # Impressum & Öffnungszeiten
├── news.json          # News-Daten (JSON)
├── css/
│   └── style.css      # Alle Styles
├── js/
│   └── script.js      # JavaScript für Navigation & News
└── images/
    ├── hero-bg.jpg    # Altes Hintergrundbild
    └── unnamed.jpg    # Aktuelles Hintergrundbild
```

## News-System

### Wie funktioniert es?

Die News auf der Startseite werden automatisch aus der Datei `news.json` geladen. Das JavaScript liest die JSON-Datei aus und zeigt die News dynamisch an.

### News hinzufügen oder bearbeiten

1. Öffnen Sie die Datei `news.json` in einem Texteditor
2. Fügen Sie einen neuen Eintrag hinzu oder bearbeiten Sie bestehende

**Beispiel:**

```json
[
  {
    "id": 1,
    "title": "Titel der Neuigkeit",
    "date": "2024-10-20",
    "content": "Hier steht der Text der Neuigkeit..."
  },
  {
    "id": 2,
    "title": "Noch eine Neuigkeit",
    "date": "2024-10-15",
    "content": "Weitere Informationen..."
  }
]
```

### Wichtige Hinweise:

- **id**: Einzigartige Nummer für jede News (fortlaufend nummerieren)
- **title**: Überschrift der News
- **date**: Datum im Format `YYYY-MM-DD` (z.B. `2024-10-20`)
- **content**: Der vollständige Text der Neuigkeit

### Datum-Format

Das Datum muss im Format `YYYY-MM-DD` sein:
- `YYYY` = Jahr (z.B. 2024)
- `MM` = Monat (01-12)
- `DD` = Tag (01-31)

Beispiel: `2024-10-20` für den 20. Oktober 2024

### News werden automatisch sortiert

Die neuesten News werden automatisch zuerst angezeigt. Sie müssen sich keine Gedanken über die Reihenfolge machen!

## Öffnungszeiten ändern

Die Öffnungszeiten können an zwei Stellen geändert werden:

1. **Startseite**: `index.html` - Zeilen 40-70
2. **Impressum**: `impressum.html` - Zeilen 93-102

## Bilder ändern

### Hintergrundbild (Hero-Section)

Um das Hintergrundbild auf der Startseite zu ändern:

1. Legen Sie Ihr neues Bild im Ordner `images/` ab
2. Öffnen Sie `css/style.css`
3. Suchen Sie nach Zeile 88: `url('../images/unnamed.jpg')`
4. Ersetzen Sie `unnamed.jpg` mit Ihrem Bildnamen

## Adresse und Standort ändern

### OpenStreetMap-Karte anpassen

In `index.html` (Zeile 96-106):

1. Ändern Sie die Koordinaten im `src`-Attribut des `<iframe>`
2. Aktualisieren Sie die Adresse in den `<p>`-Tags darunter

### Adresse im Impressum

In `impressum.html` - aktualisieren Sie:
- Zeilen 36-38: Hauptadresse
- Zeilen 58-60: Verantwortlicher

## Lokale Entwicklung

### Mit Python (empfohlen)

```bash
cd bakery-website
python3 -m http.server 8000
```

Dann öffnen Sie: `http://localhost:8000`

### Mit VSCode Live Server

1. Installieren Sie die Extension "Live Server"
2. Rechtsklick auf `index.html` → "Open with Live Server"

### Wichtig: CORS-Fehler vermeiden

Das News-System funktioniert NICHT, wenn Sie die HTML-Datei direkt öffnen (`file://`). Sie müssen einen lokalen Webserver verwenden!

## Deployment auf GitHub Pages

1. Repository auf GitHub erstellen
2. Code hochladen:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. In GitHub: Settings → Pages → Source: main branch
4. Nach wenigen Minuten ist die Website online!

## Kontaktdaten

**Bäckerei Einsiedler**
Schafgasse 13
87490 Haldenwang

**Öffnungszeiten:**
- Montag: Geschlossen
- Dienstag: 06:00 - 13:00 Uhr
- Mittwoch: 06:00 - 13:00, 15:00 - 18:00 Uhr
- Donnerstag: 06:00 - 13:00 Uhr
- Freitag: 06:00 - 12:30, 14:30 - 18:00 Uhr
- Samstag: 06:00 - 13:00 Uhr
- Sonntag: Geschlossen

## Technologie

- **HTML5** - Struktur
- **CSS3** - Design & Layout
- **Vanilla JavaScript** - Interaktivität
- **OpenStreetMap** - Karte

Keine externe Bibliotheken oder Frameworks - 100% dependency-free!

## Support

Bei Fragen oder Problemen können Sie die Issues auf GitHub nutzen oder die Website direkt bearbeiten.

# Taak 2

**Deadline**: 09/10/2022 23:59

**Score**: 40% van het totaalpunt voor dynamic web development

## Opgave

Maak een basis socialmedia platform zoals twitter. Op het sociale media platform kunnen gebruikers berichten plaatsen. Deze zijn voor alle ingelogde gebruikers zichtbaar. Een gebruiker kan op een bericht reageren aan de hand van een comment of een like. Op comments kan er enkel gereageerd worden aan de hand van likes.

### Vereisten

Zorg dat onderstaande vereisten aanwezig zijn op je website. Deze vereisten staan gesorteerd in functie van belangrijkheid. Stap 1 en 2 kan je in principe niet doen zonder stap 4. Hiervoor kan je dan tijdelijk een hardcoded access token gebruiken. Het token kan je dan generen met behulp van postman (zie [API](#api))

1. Een gebruiker kan berichten inladen (liefst aan de hand van paginatie). Laad niet alles tegelijk in, anders gaat je website lang laden. Dit hoeft niet aan de hand van infinite scrolling. Een next en previous button of load more button is voldoende.
2. Een gebruiker kan berichten plaatsen op de website.
3. Een gebruiker kan zich registreren.
4. Een gebruik kan inloggen (tip: sla het access token op in de localstorage, zo kan je dit gemakkelijk gebruiken, ook wanneer de gebruiker de website verlaten heeft).
5. Wanneer het access token van een gebruiker verlopen is, open je het inlogscherm.
6. Een gebruiker kan een bericht liken, en kan zijn like verwijderen.
7. Een gebruiker kan zijn eigen bericht verwijderen en wijzigen.
8. Een gebruiker kan een comment plaatsen onder een bericht.
9. Een gebruiker kan zijn eigen comment verwijderen en wijzigen.
10. Een gebruiker kan een comment liken en dit ook verwijderen.

Je bent vrij om te kiezen, hoe je alles toont. Je kan ervoor kiezen om comments pas te tonen wanneer een bericht aangeklikt wordt. Dit bericht zou dan geopend kunnen worden op een nieuwe pagina. Je hoeft geen twitter/facebook/... copy te maken. Kies in eerste instantie de eenvoudigste manier voor jou. Nadien kan je zoeken naar wat je zelf mooi/praktisch vindt.

Gebruik de geziene technieken zoals:

- JSON
- DOM selectie/manipulatie
- Events
- Localstorage
- Queryparameters
- Bootstrap
- Fetch
- (async & await)
- (JS classes)

## API

De api staat gedocumenteerd op postman. Je kan de documentatie lezen met behulp van [deze link](https://documenter.getpostman.com/view/12955434/2s847BVGYG#d8258971-333c-41ee-b1f9-324589e6fe8e). Met de knop run in postman kan je de apicalls in postman proberen. Hiermee zie je ook welke headers er nodig zijn en hoe de body message er uitziet indien je dit nodig hebt.

## Puntenverdeling

Er wordt in totaal op 3 onderdelen gescoord. Elke deel heeft een even groot aandeel in het eindresultaat.

### Codekwaliteit

Schrijf goede code. Vooral de javascript code zal beoordeeld worden, maar vergeet ook de kwaliteit van je HTML en CSS niet (W3C validator). Denk hierbij aan het gebruik van goede naamgevingen, ESLint regels, duidelijke code, code die geen errors geeft, ...

### Gebruiksvriendelijkheid

De website/webapplicatie die je schrijft moet voor de eindgebruiker eenvoudig te gebruiken zijn. Dit wil zeggen dat alles op logische plaatsen staat, de gebruiker geholpen wordt als die verkeerde acties onderneemt, alles leesbaar is, ....

Een goede tip: laat je website gebruiken door een onervaren persoon en kijk of deze persoon alles kan doen wat je voorzien hebt. Het mag in geen geval gebeuren dat een gebruiker vast komt te zitten op je website.

Je hoeft voor deze website geen rekening te houden met responsive design. Je mag je website maken voor een standaard laptopscherm van 15 inch.

### Volledigheid van de requirements

Zorg ervoor dat alle nodige vereisten werken zoals het hoort. Wanneer dit klaar is mag je gerust extra's voorzien.

## Spelregels

- Schrijf alle code zelf
  - Geen code van het internet
  - Geen frameworks of libraries (behalve bootstrap)
  - Geen gegenereerde code
  - Geen code van medestudenten
  - ...
- Respecteer de deadline => Te laat ingediend resulteert in een 0 score voor deze taak
- Werk individueel! Dit is een individuele opdracht. Elke vorm van samenwerken wordt beschouwd als fraude.

@echo off
title Iniciando Floricultura SPA + PWA

REM Inicia o JSON Server (na pasta 'json')
start cmd /k "cd json && npx json-server produtos.json"

REM Aguarda alguns segundos para o JSON Server iniciar
timeout /t 2 > nul

REM Inicia o servidor http local (na raiz do projeto)
start cmd /k "http-server -p 8080"

REM Aguarda mais um pouco
timeout /t 1 > nul

REM Abre o navegador na página principal
start http://localhost:8080/html/Atividade7.html

exit
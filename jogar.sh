#!/usr/bin/env bash
# RPG Welling e os demais jogos precisam de HTTP: fetch() de arquivos .glb
# é bloqueado quando o site é aberto via file:// (CORS de origin null).
# Este script sobe um servidor local e abre o launcher no navegador.
set -e
PORT="${JULIA_PORT:-8123}"
DIR="$(cd "$(dirname "$0")" && pwd)"

if command -v xdg-open >/dev/null 2>&1; then OPEN=xdg-open
elif command -v open >/dev/null 2>&1; then OPEN=open
else OPEN=""; fi

# já tem algo na porta? só abre
if curl -s -o /dev/null "http://localhost:$PORT/" 2>/dev/null; then
  echo "Servidor já rodando em http://localhost:$PORT/"
  [ -n "$OPEN" ] && "$OPEN" "http://localhost:$PORT/index.html"
  exit 0
fi

echo "Servindo $DIR em http://localhost:$PORT/  (Ctrl+C para parar)"
[ -n "$OPEN" ] && (sleep 1 && "$OPEN" "http://localhost:$PORT/index.html") &
python3 -m http.server "$PORT" --directory "$DIR"

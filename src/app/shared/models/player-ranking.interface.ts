/* 
id: number

Identificador único del jugador en el sistema.

Se usa para:

Trackear registros

Evitar duplicados

Referenciarlo en base de datos

Optimizar render con trackBy

🔹 nickname: string

Nombre público del jugador dentro del ranking.

Es el identificador visible.

No necesariamente es el nombre real.

Puede ser su gamer tag.

🔹 avatarUrl?: string

URL opcional de la imagen de perfil.

Mejora UX en tablas tipo leaderboard.

Puede ser imagen personalizada o default.

Es opcional (?).

🔹 game: 'MTG' | 'POKEMON' | 'YUGIOH' | 'ONEPIECE'

Indica el juego al que pertenece el ranking.

Esto permite:

Filtrar ranking por juego.

Mantener rankings independientes.

Evitar mezclar estadísticas entre juegos.

Ejemplo:
Un jugador puede ser top en Pokémon pero no en MTG.

🔹 points: number

Puntos acumulados en el sistema de ranking.

Normalmente se calculan con:

3 puntos por victoria

1 punto por empate

0 por derrota

O cualquier sistema personalizado.

Este campo es el que usualmente define la posición.

🔹 eventsPlayed: number

Cantidad total de eventos jugados.

Puede incluir:

Torneos

Ligas semanales

No necesariamente partidas individuales

Sirve para:

Medir actividad

Detectar jugadores inactivos

Calcular métricas promedio

🔹 wins: number

Total de partidas ganadas.

No eventos, sino matches individuales.

🔹 losses: number

Total de partidas perdidas.

🔹 draws: number

Empates.

En TCG como:

MTG

Pokémon

Los empates son posibles por tiempo.

🔹 position: number

Posición actual en el ranking.

Debe calcularse dinámicamente a partir de:

points

posibles tiebreakers

Ejemplo:
1, 2, 2, 4 si hay empate.

🔹 previousPosition?: number

Posición en el ranking anterior.

Se usa para:

Mostrar tendencia (⬆ ⬇)

Calcular variación

Mostrar indicadores visuales

Ejemplo:

Estaba en 5

Ahora está en 3
→ Subió 2 posiciones

🔹 tournaments: number

Cantidad de torneos oficiales jugados.

Diferente de eventsPlayed si:

eventsPlayed incluye ligas casuales

tournaments solo eventos oficiales

Sirve para segmentar métricas.

🔹 winRate: number

Porcentaje de victorias.

Normalmente se calcula como:

wins / (wins + losses + draws) * 100

O en algunos sistemas:

wins / totalMatches

Este campo ayuda a:

Identificar consistencia

Comparar jugadores con diferente volumen de partidas

Ejemplo:
Jugador A: 30 wins en 50 partidas → 60%
Jugador B: 10 wins en 12 partidas → 83%

Aquí puedes debatir quién es “mejor”.

*/
export interface PlayerRanking {
  id: number;
  nickname: string;
  avatarUrl?: string;
  game: 'MTG' | 'POKEMON' | 'YUGIOH' | 'ONEPIECE';
  points: number;
  eventsPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  position: number;
  previousPosition?: number;
  tournaments: number;
  winRate: number;
}

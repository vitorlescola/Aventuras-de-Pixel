document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('game-container');

    let playerPosition = 50; // posição inicial do jogador
    let jumping = false; // verifica se o jogador está pulando
    let jumpHeight = 100; // altura máxima do pulo
    let jumpSpeed = 7; // velocidade do pulo
    let gravity = 7; // gravidade
    let moveLeft = false; // verifica se o jogador está se movendo para a esquerda durante o pulo
    let moveRight = false; // verifica se o jogador está se movendo para a direita durante o pulo
    let moveSpeed = 5; // velocidade do movimento horizontal

    document.addEventListener('keydown', function(event) {
        // mover para a esquerda
        if (event.key === 'a') {
            moveLeft = true;
        }
        // mover para a direita
        else if (event.key === 'd') {
            moveRight = true;
        }
        // pular
        else if (event.key === 'w' && !jumping) {
            jumping = true;
            jump();
        }else if (event.key === ' ' && !jumping) {
            jumping = true;
            jump();
        }
    });

    document.addEventListener('keyup', function(event) {
        // parar de se mover para a esquerda
        if (event.key === 'a') {
            moveLeft = false;
        }
        // parar de se mover para a direita
        else if (event.key === 'd') {
            moveRight = false;
        }
    });

    function jump() {
        let initialPosition = parseInt(player.style.bottom) || 0;
        let currentPosition = initialPosition;

        let jumpInterval = setInterval(function() {
            currentPosition += jumpSpeed;
            if (currentPosition >= jumpHeight) {
                clearInterval(jumpInterval);
                // inverte a direção do pulo
                let fallInterval = setInterval(function() {
                    currentPosition -= gravity;
                    player.style.bottom = currentPosition + 'px';
                    if (currentPosition <= initialPosition) {
                        clearInterval(fallInterval);
                        player.style.bottom = initialPosition + 'px';
                        jumping = false;
                    }
                }, 10);
            } else {
                player.style.bottom = currentPosition + 'px';
            }
        }, 10);

        // Verificar e aplicar movimento horizontal durante o pulo
        let moveInterval = setInterval(function() {
            let horizontalVelocity = 0;

            if (moveLeft) {
                horizontalVelocity = -moveSpeed; // velocidade negativa para a esquerda
            } else if (moveRight) {
                horizontalVelocity = moveSpeed; // velocidade positiva para a direita
            }

            // Aplicar velocidade horizontal à posição do jogador
            playerPosition += horizontalVelocity;
            const maxWidth = gameContainer.clientWidth - player.offsetWidth; // largura máxima do container
            playerPosition = Math.max(0, Math.min(maxWidth, playerPosition)); // manter o jogador dentro da tela
            player.style.left = playerPosition + 'px';
        }, 10);
    }
});
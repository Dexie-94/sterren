const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Canvas grootte instellen
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Ster-object
        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // Grootte tussen 2 en 5
                this.speedX = (Math.random() - 0.5) * 1; // Willekeurige snelheid zijwaarts
                this.speedY = (Math.random() - 0.5) * 1; // Willekeurige snelheid op/neer
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Als de ster buiten beeld gaat, teleporteren we hem naar de andere kant
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "white";
                ctx.fill();
            }
        }

        // Sterren array
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push(new Star());
        }

        // Animatielus
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
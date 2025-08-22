import "@/public/avatar-me.png"
import { Mail, Github, Linkedin, Download } from "lucide-react";

export const Bento = () =>


    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 font-mono">

      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-gray-500/25 backdrop-blur-lg lg:rounded-l-4xl"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0 ">
              <img src={"/avatar-me.png"} alt="avatar" className={"w-60 h-60 justify-self-center"} />
            <p className="mt-2 text-3xl font-medium tracking-tight text-white max-lg:text-center">Sehnya Edwards</p>
            <p className="mt-2 max-w-lg text-sm text-white max-lg:text-center">Full-Stack Developer</p>
            <div className="mt-4 flex flex-col items-center gap-2 text-white/90">
              <a
                href="mailto:sehnyaedwards@gmail.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
                aria-label="Email"
                title="sehnyaedwards@gmail.com"
              >
                <Mail size={18} aria-hidden="true" />
                <span className="text-sm sm:text-base">sehnyaedwards@gmail.com</span>
              </a>
              <div className="flex gap-4">
                <a
                  href="https://github.com/sehnya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  aria-label="GitHub"
                  title="https://github.com/sehnya"
                >
                  <Github size={18} aria-hidden="true" />
                  <span className="text-sm sm:text-base hidden sm:inline">@sehnya</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sehnya-edwards-8315541a8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                  title="www.linkedin.com/in/sehnya-edwards-8315541a8"
                >
                  <Linkedin size={18} aria-hidden="true" />
                  <span className="text-sm sm:text-base hidden sm:inline">in/sehnya</span>
                </a>
              </div>
            </div>
              <div className="px-6 pt-6 pb-14 text-sm/6 text-white/90">
                  <p>Full-stack developer with a background in healthcare and a passion for building seamless, user-friendly web apps. Skilled in JavaScript, Python, and modern frameworks with a focus on performance and accessibility.</p>
              </div>
          </div>


        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl"></div>
      </div>
      <div className="relative max-lg:row-start-1">
        <div className="absolute inset-px rounded-lg bg-gray-500/25 backdrop-blur-lg max-lg:rounded-t-4xl"></div>
        <div className="relative z-10 flex h-full flex-col overflow-visible rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Behind My Work</p>
            <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">Technologies I utilize in my projects.</p>
          </div>
          <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 ">
              {/* JavaScript */}
              <a className="tech-link" style={{ ["--glow" as any]: "#F7DF1E" }} href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" aria-label="JavaScript" title="JavaScript Docs">
                <img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JavaScript" className="tech-icon" />
                <span className="tech-tooltip">JavaScript</span>
              </a>
              {/* HTML5 */}
              <a className="tech-link" style={{ ["--glow" as any]: "#E34F26" }} href="https://developer.mozilla.org/docs/Web/HTML" target="_blank" rel="noopener noreferrer" aria-label="HTML5" title="HTML5 Docs">
                <img src="https://cdn.simpleicons.org/html5/E34F26" alt="HTML5" className="tech-icon" />
                <span className="tech-tooltip">HTML5</span>
              </a>
              {/* CSS */}
              <a className="tech-link" style={{ ["--glow" as any]: "#1572B6" }} href="https://developer.mozilla.org/docs/Web/CSS" target="_blank" rel="noopener noreferrer" aria-label="CSS" title="CSS Docs">
                <img src="https://cdn.simpleicons.org/css/1572B6" alt="CSS" className="tech-icon" />
                <span className="tech-tooltip">CSS</span>
              </a>
              {/* Tailwind CSS */}
              <a className="tech-link" style={{ ["--glow" as any]: "#06B6D4" }} href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" aria-label="Tailwind CSS" title="Tailwind CSS Docs">
                <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" alt="Tailwind CSS" className="tech-icon" />
                <span className="tech-tooltip">Tailwind CSS</span>
              </a>
              {/* PostgreSQL */}
              <a className="tech-link" style={{ ["--glow" as any]: "#4169E1" }} href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer" aria-label="PostgreSQL" title="PostgreSQL Docs">
                <img src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL" className="tech-icon" />
                <span className="tech-tooltip">PostgreSQL</span>
              </a>
              {/* React */}
              <a className="tech-link" style={{ ["--glow" as any]: "#61DAFB" }} href="https://react.dev/learn" target="_blank" rel="noopener noreferrer" aria-label="React" title="React Docs">
                <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="tech-icon" />
                <span className="tech-tooltip">React</span>
              </a>
              {/* Vue */}
              <a className="tech-link" style={{ ["--glow" as any]: "#4FC08D" }} href="https://vuejs.org/guide" target="_blank" rel="noopener noreferrer" aria-label="Vue" title="Vue Docs">
                <img src="https://cdn.simpleicons.org/vuedotjs/4FC08D" alt="Vue" className="tech-icon" />
                <span className="tech-tooltip">Vue</span>
              </a>
              {/* Prisma */}
              <a className="tech-link" style={{ ["--glow" as any]: "#2D3748" }} href="https://www.prisma.io/docs" target="_blank" rel="noopener noreferrer" aria-label="Prisma" title="Prisma Docs">
                <img src="https://cdn.simpleicons.org/prisma/2D3748" alt="Prisma" className="tech-icon" />
                <span className="tech-tooltip">Prisma</span>
              </a>
              {/* Python */}
              <a className="tech-link" style={{ ["--glow" as any]: "#3776AB" }} href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" aria-label="Python" title="Python Docs">
                <img src="https://cdn.simpleicons.org/python/3776AB" alt="Python" className="tech-icon" />
                <span className="tech-tooltip z-40">Python</span>
              </a>
              {/* Flask */}
              <a className="tech-link" style={{ ["--glow" as any]: "#000000" }} href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer" aria-label="Flask" title="Flask Docs">
                <img src="https://cdn.simpleicons.org/flask/000000" alt="Flask" className="tech-icon" />
                <span className="tech-tooltip z-40">Flask</span>
              </a>
              {/* Bun */}
              <a className="tech-link overflow-visible" style={{ ["--glow" as any]: "#F9F1E1" }} href="https://bun.sh/docs" target="_blank" rel="noopener noreferrer" aria-label="Bun" title="Bun Docs" >
                <img src="https://cdn.simpleicons.org/bun/F9F1E1" alt="Bun" className="tech-icon" />
                <span className="tech-tooltip absolute z-40">Bun</span>
              </a>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl"></div>
      </div>
      <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
        <div className="absolute inset-px rounded-lg bg-gray-500/25 backdrop-blur-lg"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
            <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Projects</p>
          </div>
          <div className="flex-1 px-8 pb-6 sm:px-10 lg:pb-4">
            <ul className="space-y-4">
              {/* Project 1: stack-it */}
              <li className="rounded-lg bg-white/5 p-4 outline outline-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <a href="https://www.stack-it.dev" target="_blank" rel="noopener noreferrer" className="text-white hover:underline text-sm sm:text-base break-all" aria-label="Open www.stack-it.dev" title="www.stack-it.dev">
                    www.stack-it.dev
                  </a>
                  <Github href="https://github.com/Sehnya/stack-it" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline underline-offset-2 text-xs sm:text-sm" aria-label="GitHub repository: Sehnya/stack-it" title="GitHub: Sehnya/stack-it">

                  </Github>
                </div>

              </li>

              {/* Project 2: seh-nya.com */}
              <li className="rounded-lg bg-white/5 p-4 outline outline-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <a href="https://www.seh-nya.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline text-sm sm:text-base break-all" aria-label="Open www.seh-nya.com" title="www.seh-nya.com">
                    www.seh-nya.com
                  </a>
                  <Github href="https://github.com/Sehnya/seh-nya" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline underline-offset-2 text-xs sm:text-sm" aria-label="GitHub repository: Sehnya/seh-nya" title="GitHub: Sehnya/seh-nya">

                  </Github>
                </div>

              </li>

              {/* Project 3: roma.seh-nya.com */}
              <li className="rounded-lg bg-white/5 p-4 outline outline-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <a href="https://roma.seh-nya.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline text-sm sm:text-base break-all" aria-label="Open roma.seh-nya.com" title="roma.seh-nya.com">
                    roma.seh-nya.com
                  </a>
                  <Github href="https://github.com/Sehnya/roma" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline underline-offset-2 text-xs sm:text-sm" aria-label="GitHub repository: Sehnya/roma" title="GitHub: Sehnya/roma">

                  </Github>
                </div>

              </li>
            </ul>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15"></div>
      </div>
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-gray-500/25 backdrop-blur-lg max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
          <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
            <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Let's connect</p>
            <p className="mt-2 max-w-lg text-sm/6 text-white max-lg:text-center">Interested in collaborating or have an opportunity in mind? I'd love to hear from you.</p>
          </div>
          <div className="relative min-h-120 w-full grow flex items-center justify-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 rounded-xl bg-white/10 px-6 py-3 text-white text-lg hover:bg-white/20 outline outline-white/10 transition-colors"
              aria-label="Download Resume"
              title="Download Resume"
            >
              <Download size={24} aria-hidden="true" />
              <span>Download Résumé</span>
            </a>
          </div>

        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
      </div>
    </div>

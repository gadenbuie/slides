/* global slideshow,LeaderLine */

(function () {
  const ready = function (fn) {
    /* MIT License Copyright (c) 2016 Nuclei */
    /* https://github.com/nuclei/readyjs */
    const completed = () => {
      document.removeEventListener('DOMContentLoaded', completed)
      window.removeEventListener('load', completed)
      fn()
    }
    if (document.readyState !== 'loading') {
      setTimeout(fn)
    } else {
      document.addEventListener('DOMContentLoaded', completed)
      window.addEventListener('load', completed)
    }
  }

  function emailAttachment () {
    const btn = document.getElementById('email-attachment')
    btn.addEventListener('click', function (ev) {
      btn.classList.toggle('zoomForward')
      setTimeout(() => slideshow.gotoNextSlide(), 1000)
      setTimeout(() => btn.classList.remove('zoomForward'), 1500)
    })
  }

  function sqlMagnifier () {
    const sqlMagnifier = document.getElementById('sql-magnifier')
    const sqlCode = document.querySelector('.code-two-column pre code.sql')
    sqlCode.addEventListener('mouseover', function(ev) {
      if (ev.target.classList.contains('remark-code-line')) {
        sqlMagnifier.innerHTML = ev.target.outerHTML
      }
    })
    sqlCode.addEventListener('mouseleave', function() {
      sqlMagnifier.innerHTML = ''
    })
  }

  function wordButtons () {
    const btnDown = document.getElementById('sql-font-size-down')
    const btnUp = document.getElementById('sql-font-size-up')
    const btnFont = document.getElementById('sql-font-comic-sans')
    const code = document.querySelector('.word-doc pre code')
    let size = 100
    code.style.fontSize = size + '%'
    btnDown.addEventListener('click', function () {
      if (size <= 10) return
      size = size - 10
      code.style.fontSize = size + '%'
    })
    btnUp.addEventListener('click', function () {
      if (size >= 100) return
      size = size + 10
      code.style.fontSize = size + '%'
    })
    btnFont.addEventListener('click', function (ev) {
      if (btnFont.innerText === '') {
        btnFont.innerText = 'Comic Sans'
        code.style.fontFamily = '"Comic Sans MS", cursive, sans-serif'
      } else {
        btnFont.innerText = ''
        code.style.fontFamily = 'sans-serif'
      }
    })
  }

  function initStyleClickers () {
    const styleClickers = document.querySelectorAll('.remark-slides-area .onClickStyle')
    for (const styleClicker of styleClickers) {
      styleClicker.extraClasses = [...styleClicker.classList].filter(c => c !== 'onClickStyle')
      styleClicker.classList = 'onClickStyle'
      styleClicker.style.cursor = 'pointer'
      styleClicker.addEventListener('click', function (ev) {
        console.log(styleClicker)
        if (styleClicker.classList.length > 1) {
          styleClicker.classList = 'onClickStyle'
        } else {
          styleClicker.classList = ['onClickStyle', ...styleClicker.extraClasses].join(' ')
        }
      })
    }
  }

  function connectElements (i, startSocket = 'top', endSocket = 'auto') {
    const startElements = document
      .querySelectorAll(`.remark-slides-area .leader-start-${i}`)

    startElements.forEach(function (start) {
      const end = start.closest('.remark-slide-content').querySelector(`.leader-end-${i}`)
      start.line = new LeaderLine(start, end, {
        hide: !start.closest('.remark-slide-container').classList.contains('remark-visible')
      })
      start.line.setOptions({ startSocket, endSocket })
      const lineEl = document.querySelector('body > svg.leader-line')
      const slide = start.closest('.remark-slides-area')
      slide.appendChild(lineEl)
      return start.line
    })
  }

  function showOrDrawLineElement (el) {
    const lineClass = [...el.classList].filter(c => c.match(/^leader-start/))[0]
    const lineElements = el.closest('.remark-slides-area').querySelectorAll('.' + lineClass)
    el.line.position()
    if (lineElements[0] === el) {
      el.line.show('draw')
    } else {
      el.line.show('none')
    }
  }

  function initializeLeaderLines () {
    connectElements(1, 'bottom')
    connectElements(2, 'bottom')
    connectElements(3, 'bottom', 'top')
    connectElements(4, 'bottom')
    connectElements(5, 'left', 'bottom')

    slideshow.on('hideSlide', function (slide) {
      const idx = slide.getSlideIndex()
      const slides = document.querySelectorAll('.remark-slides-area .remark-slide-container')
      const thisSlide = slides[idx]
      const lineLeaders = thisSlide.querySelectorAll('[class^="leader-start"]')
      if (lineLeaders.length) {
        lineLeaders.forEach(el => el.line.hide('none'))
      }
    })

    slideshow.on('afterShowSlide', function (slide) {
      const idx = slide.getSlideIndex()
      const slides = document.querySelectorAll('.remark-slides-area .remark-slide-container')
      const thisSlide = slides[idx]
      const lineLeaders = thisSlide.querySelectorAll('[class^="leader-start"]')
      if (lineLeaders.length) {
        lineLeaders.forEach(function (el) {
          showOrDrawLineElement(el)
        })
      }
    })

    window.addEventListener('resize', function () {
      document
        .querySelectorAll('.remark-slides-area [class^="leader-start"]')
        .forEach(el => el.line.position())
    })
  }

  ready(emailAttachment)
  ready(sqlMagnifier)
  ready(wordButtons)
  ready(initStyleClickers)
  ready(initializeLeaderLines)
})()

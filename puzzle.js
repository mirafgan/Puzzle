let myarr = new Array();

let stat = 0
let wrong = 0
$(() => {
    const game = $('#game')
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            game.append(`<div></div>`)

            game.children().last().css({
                top: `${100 * i}px`,
                left: `${100 * j}px`,
                background: `url('puzzle.jpg')
                        ${-100 * j}px
                        ${-100 * i}px`,
            })
        }
    }
    $('img').after(`<button>Shuffle</button>`)
    $('button').css({
        "box-shadow": '0px 10px 14px -7px #276873',
        background: 'linear-gradient(to bottom, #599bb3 5% ,#408c99 100%)',
        "background-color": '#599bb3',
        "border-radius": '8px',
        position: 'absolute',
        cursor: 'pointer',
        color: '#fff',
        "font": 'bold 20px',
        padding: '13px 32px',
        margin: '10px 0 0 200px',
        "text-shadow": '0px 1px 0px #3d768a'
    })
    $('button').click(function() {
        // console.log(game.children().eq(2).index())
        for (let i = 0; i < 48; i++) {
            myarr.push(game.children().eq(i).position()); // hər kartın top,leftini array e push edir.
            game.children().eq(i).css({
                left: `${rand(800,$(window).width()-100)}px `,
                top: `${rand(0,600)}px`,
                transform: `rotate(${rand(-45,45)}deg)`
            })
        }
    })
    var counts = [0, 0, 0];
    for (let i = 0; i <= 48; i++) {
        game.children().draggable({
            containment: "window",
            start: function() {
                counts[0]++;
                $(this).css({
                    zIndex: 99,
                    opacity: 0.8,
                })
            },
            drag: function() {
                counts[1]++;
                $(this).css({
                    transform: `rotate(0deg)`,
                    transition: `transform 1s`
                })
            },
            stop: function() {
                $(this).css({ opacity: 1 })
                let p = $(this).position()
                var k = Math.round(p.top / 100) * 100
                var m = Math.round(p.left / 100) * 100
                if (p.top < 600 && p.left < 800 && k != myarr[$(this).index()]['top'] && m != myarr[$(this).index()]['left']) {
                    wrong++
                    $(this).css({
                        left: `${rand(800,$(window).width()-100)}px `,
                        top: `${rand(0,600)}px`,
                        transition: `all 1s`,
                        transform: `rotate(${rand(-45,45)}deg)`,
                        "box-shadow": '#ff0000 0px 0px 5px'
                    })
                }
                if (p.top < 600 && p.left < 800 && k == myarr[$(this).index()]['top'] && m == myarr[$(this).index()]['left']) {
                    stat++
                    $(this).css({
                        left: Math.round(p.left / 100) * 100,
                        top: Math.round(p.top / 100) * 100,
                        "box-shadow": 'none'
                    })
                    $(this).draggable({ disabled: true })
                }
                counts[2]++;
                if (stat == 48) alert(`TƏBRİKLƏR ${wrong} yanlış cəhd ilə oyunu qazandınız.`)
            }
        })
    }
})

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
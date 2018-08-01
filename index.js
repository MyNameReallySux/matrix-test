
let scale = (point, scaleFactor) => scaleFactor * point
let translate = (point, translate) => point + translate

const GLOBAL = { translate: { x: 3, y: 1 }, scale: { x: 2, y: 3 } }
const DEFORM = { translate: { x: 1, y: 2 }, scale: { x: 3, y: 4 } }

const combineTransforms = (m1, m2) => {
    return {
        scale: {
            x: m1.scale.x * m2.scale.x,
            y: m1.scale.y * m2.scale.y
        },
        translate: {
            x: m2.translate.x + (m1.translate.x * m2.scale.x),
            y: m2.translate.y + (m1.translate.y * m2.scale.y)
        }
    }
}

let point = { x: 1, y: 1 }
console.log(`Orig Point [${point.x},${point.y}]`)
console.log()

let tPoint = Object.assign({}, point)

tPoint.x = scale(tPoint.x, GLOBAL.scale.x)
tPoint.x = translate(tPoint.x, GLOBAL.translate.x)
tPoint.y = scale(tPoint.y, GLOBAL.scale.y)
tPoint.y = translate(tPoint.y, GLOBAL.translate.y)

console.log(`GLOBAL:`, GLOBAL)
console.log(`[${point.x},${point.y}] => [${tPoint.x},${tPoint.y}]`)
console.log()

let dPoint = Object.assign({}, tPoint)

dPoint.x = scale(dPoint.x, DEFORM.scale.x)
dPoint.x = translate(dPoint.x, DEFORM.translate.x)

dPoint.y = scale(dPoint.y, DEFORM.scale.y)
dPoint.y = translate(dPoint.y, DEFORM.translate.y)

console.log(`DEFORM:`, DEFORM)
console.log(`[${tPoint.x},${tPoint.y}] => [${dPoint.x},${dPoint.y}]`)
console.log()

let cPoint = Object.assign({}, point)

const COMBINED = combineTransforms(GLOBAL, DEFORM)

cPoint.x = scale(cPoint.x, COMBINED.scale.x)
cPoint.x = translate(cPoint.x, COMBINED.translate.x)

cPoint.y = scale(cPoint.y, COMBINED.scale.y)
cPoint.y = translate(cPoint.y, COMBINED.translate.y)

console.log(`COMBINED:`, COMBINED)
console.log(`Point [${cPoint.x},${cPoint.y}]`)

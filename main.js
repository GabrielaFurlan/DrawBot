function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas()
{
    background("white");
}

function draw()
{
    strokeWeight(5);
    stroke(0);
    if(mouseIsPressed)
    {
        line(pmouseX, pmouseY , mouseX, mouseY);
    }
    
}
function classifyCanvas()
{
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    var result = results[0].label;
    document.getElementById('label').innerHTML = 'nome: ' +result.replace('_', ' ');
    document.getElementById('confidence').innerHTML = 'precisão: ' + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results.replace('_', ' ') );
    synth.speak(utterThis);
}
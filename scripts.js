
var paperWidth = 210;
var paperHeight = 297;
var lineThicknessChoices = {
	'Thick': 2,
	'Thin': 0.5,
	'Normal': 1
}

var canvas = document.getElementById('circle-bg');
var ctx = canvas.getContext('2d');

ctx.fillStyle='#FF0000';
ctx.fillRect(0, 100,50,100);

const drawLine = (doc, ht, lineThickness) => {
	inc = ht;
	numLines = parseInt(paperHeight/ht);
	for (let i=0; i<numLines; i++){
		doc.setDrawColor(0,0,0);
		doc.setLineWidth(lineThickness);
		doc.line(0, inc, paperWidth, inc); // x coor, y coor, length x, length y 

		inc = inc + ht + lineThickness;

		drawDotted(doc, inc);
		inc = inc + ht + 0.1;

		doc.setLineWidth(lineThickness);
		doc.line(0, inc, paperWidth, inc);

		doc.setDrawColor(255,255,255);
		doc.setLineWidth(5);
		doc.line(0, inc+3, paperWidth, inc+3);
	
		inc = inc + 5;
	}	
}

const drawDotted = (doc, y) => {
	doc.setLineWidth(0.1);
	dash = 3;
	x = 0;
	while (x<paperWidth){
		doc.line(x, y, x+dash, y);
		x = x + dash + 5;
	}
}


const drawDiagonal = (doc, angle, ht, lineThickness) => {
	doc.setLineWidth(0.1);
	inc = 2*ht;
	numLines = parseInt(paperHeight/ht);
	width = computeLength(angle,ht);
	i=0;
	totalwidth = width;
	while (i<numLines+1){
		doc.line(0, inc, totalwidth, ht);
		inc = inc + ht + lineThickness;
		totalwidth += width;
		if(totalwidth>=paperWidth){
			i+=1;
		}
	}	
}

const computeLength = (angle, ht) => {
	return ht/Math.tan(getRadian(angle));
}

const getRadian = (angle) => {
	return angle/180*Math.PI;
}

const downloadPDF = (ht, width, angle) => {
	var doc = new jsPDF('p','mm','a4');
	doc.text('Custom Lettering Guides', 80, 7);

	drawDiagonal(doc, angle, ht, width);
	drawLine(doc, ht, width);	
	pdfOutput = doc.output('datauristring');
	preview.src = pdfOutput;
}


$(function() {
  $('#pdf-form').on("submit",function(e) {
    e.preventDefault(); // cancel the actual submit
	ht = document.getElementById('height').value;
	ht = parseInt(ht);
	thickness = document.getElementById('line-thickness').value;
	thickness = lineThicknessChoices[thickness];
	angle = $('#slant-angle').val();

	downloadPDF(ht,thickness,angle);
  });
});

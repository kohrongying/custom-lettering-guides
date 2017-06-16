
var paperWidth = 210;
var paperHeight = 297;
var lineWidth = {
	'Thick': 2,
	'Thin': 0.5,
	'Normal': 1
}

const drawLine = (doc, ht) => {
	ht = parseInt(ht);
	inc = ht;
	numLines = parseInt(paperHeight/ht);
	for (let i=0; i<numLines; i++){

		// x coor, y coor, length x, length y 
		doc.line(0, inc, paperWidth, inc);
		inc = inc + ht;
	}	
}

const setLineWidth = (doc, width) => {
	doc.setLineWidth(lineWidth[width]);
}

const drawDiagonal = (doc, angle, ht) => {
	doc.setLineWidth(0.1);
	ht = parseInt(ht);
	inc = ht;
	numLines = parseInt(paperHeight/ht);
	for (let i=0; i<numLines; i++){
		doc.line(0, inc, computeLength(angle,inc), 0);
		inc = inc + ht;
	}	
	
}

const computeLength = (angle, ht) => {
	return ht/Math.tan(getRadian(angle));
}

const getRadian = (angle) => {
	return angle/180*Math.PI;
}

const downloadPDF = (ht, width) => {
	var doc = new jsPDF('p','mm','a4');
	setLineWidth(doc, width);
	drawLine(doc, ht);	
	drawDiagonal(doc,30,ht);
	pdfOutput = doc.output('datauristring');
	preview.src = pdfOutput;
		// doc.save('hello_world.pdf');
}


$(function() {
  $('#pdf-form').on("submit",function(e) {
    e.preventDefault(); // cancel the actual submit
	ht = document.getElementById('height').value;
	width = document.getElementById('line-thickness').value;
	console.log(ht);
	console.log(width);
	downloadPDF(ht,width);
  });
});

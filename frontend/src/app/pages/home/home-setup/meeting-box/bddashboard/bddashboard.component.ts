import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bddashboard',
  templateUrl: './bddashboard.component.html',
  styleUrls: ['./bddashboard.component.scss']
})
export class BddashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public generatePDF() {
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options 
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('dashboard.pdf'); // Generated PDF  
    });
  }

}

import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserTableModel } from '../models/user-table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['nombre', 'puesto', 'area', 'antiguedad', 'nss', 'numeroCol', 'carnet', 'usuario', 'telefono', 'correo'];
  data: UserTableModel[] = [
    {
      Nombre: "Jose Augusto",
      puesto: "Programador",
      Area: "TI",
      antiguedad: 5,
      NSS: 6332023904234,
      numeroCol: 349,
      Carnet: 510,
      Usuario: "Augusto",
      telefono: 234235234,
      correo: "augusto.perez@welldex.com"
      },
      {
        Nombre: "Miguel Acosta",
        puesto: "Programador",
        Area: "TI",
        antiguedad: 1,
        NSS: 1234023904234,
        numeroCol: 350,
        Carnet: 511,
        Usuario: "Macosta",
        telefono: 234235234,
        correo: "miguel.acosta@welldex.com"
        }
  ];
  dataSource: MatTableDataSource<UserTableModel> = new MatTableDataSource<UserTableModel>();
  loadFile: any = null;
  uploadedObject: any;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  onLoadFile(){
    if(this.loadFile === null){
      alert('No se ha seleccionado ningún archivo')
      return;
    }
    this.uploadedObject.forEach(element => {
      this.data.push(element);
    });
    this.table.renderRows();
    this.loadFile = null;
    this.cdr.detectChanges();
  }

  onUploadFile(file){
    if(file[0].type !== "text/plain"){
      alert('Archivo invalido');
      return;
    }
    //console.log(JSON.stringify(ELEMENT_DATA[1]));
    

    this.loadFile = file[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      try{
        this.uploadedObject = JSON.parse(fileReader.result.toString());
      }catch(error){
        alert('Archivo incorrecto Intenta con otro archivo')
        this.loadFile = null;
        return;
      }
    }
    fileReader.readAsText(this.loadFile);
  }
}



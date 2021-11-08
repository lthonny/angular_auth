import {Component, Inject, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskService} from "../../../services/task.service";
import {ArchiveTasksService} from "../../../services/archive.tasks.service";
import {AssignedService} from "../../../services/assigned.service";

import {DialogData, IArchive, IDescriptionUpdate, ITransaction, IUAssigned } from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../../../services/transaction.service";
import {formatDate} from "@angular/common";
import {InviteService} from "../../../services/invite.service";


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss']
})
export class TaskDescriptionComponent implements OnInit {

  private readonly _id: number;
  public title: string = '';
  public description!: FormControl;
  public updateT: boolean = false;

  public users: any = [];

  public noAssignedUsers: any = [];
  public assignedUsers: any = [];

  private _boardId!: any;
  public transactionTask: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public taskService: TaskService,
    public archiveService: ArchiveTasksService,
    private assignedService: AssignedService,
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private inviteService: InviteService
  ) {
    this._id = data.item.id;
    this.title = data.item.title;
    this._boardId = this.data.board;
    this.description = new FormControl(this.data.item.description);
  }

  ngOnInit(): void {
    this.transaction();

    this.assignedFetch();

    // this.inviteService.InviteUsers$().subscribe((data: any) => console.log(data);)

    // this.assignedService.Fetch$(this._id, localStorage.getItem('id'), this._boardId)
    //   .subscribe((data: any) => {
    //     console.log('users all', data);
    //     data.users.forEach((user: any) => {
    //       // if (user.assigned === true) {
    //       // this.assignedUsers.push(user);
    //       //   console.log('assignedUsers', this.assignedUsers);
    //       // } else {
    //       // if(user.name !== '_thonny_montana_') {
    //       this.users.push(user);
    //       // }
    //       //   console.log('user', user.id);
    //       // }
    //     });
    //     data.usersAssigned.forEach((user: any) => {
    //       console.log('user all assigned', user);
    //       if (user.assigned === true) {
    //         this.assignedUsers.push(user);
    //         this.users = this.users.filter((data: any) => data.id !== user.id);
    //         console.log('true', user)
    //       } else {
    //         console.log('false', user);
    //       }
    //       // if (user.assigned === false && user.name !== '_thonny_montana_') {
    //       //   // console.log(user.name === '_thonny_montana_');
    //       //   console.log('false', user);
    //       //  this.users.push(user);
    //       //  this.assignedUsers = this.assignedUsers.filter((data: any) => data.id !== user.id);
    //       // }
    //     })
    //     // data.noAssigned.forEach((user: any, index: any) => {
    //     // this.users = filter((data: any) => data.id === user.id)
    //     // if(
    //     //   user.id !== this.assignedUsers.id &&
    //     //   user.id !== this.users.id
    //     // ) {
    //     // console.log('user---->', this.assignedUsers)
    //     // }
    //     // })
    //   })
  }

  assignedFetch() {
    this.assignedService.Fetch$(4, localStorage.getItem('id'), this._boardId)
      .subscribe((data: any) => { console.log(data);
        data.users.forEach((user: IUAssigned) => {
          // console.log('user.assigned', !user.assigned);
          // if(user.assigned) {
          //   this.assignedUsers.push(user);
          // } else {
            this.users.push(user);
          // }
        });
        // data.usersAssigned.forEach((user: IUAssigned) => this.assignedUsers.push(user));
      });
  }

  assignedCreate(user: IUAssigned) {
    console.log('click +', user);

    this.assignedService.Create$(this._id, user.id)
      .subscribe((user) => { console.log('пользователь добавлен', user);
          this.users = this.users.filter((qqz: any) => user.id !== qqz.id);
          this.assignedUsers.push(user);
      })
  }

  noAssigned(user: any) {
    this.assignedUsers.remove$(this._id, user.id, user.assigned).subscribe((data: any) => console.log(data));
  }

  updateAssigned(user: any) {
    console.log('click updateAssigned', user);
    //
    //   // this.assignedUsers = this.assignedUsers.filter((user: any) => {
    //   //   if (user.id !== id) {
    //   //     return user;
    //   //   } else {
    //   //     this.users.push(user);
    //   //   }
    //   // });
    //
    console.log(this._id, user.id, user.assigned)
    this.assignedService.Remove$(this._id, user.id, user.assigned)
      .subscribe((data): any => {
        console.log('update user.assigned === true', data);
        this.assignedUsers = this.assignedUsers.filter((qqz: any) => user.id !== qqz.id)
        this.users.push(data);
      })
  }

  transaction() {
    console.log('start transaction');
    this.transactionService.fetchTransaction(this._id, this._boardId)
      .subscribe((data: ITransaction[]) => {
        data.forEach((transaction: ITransaction) => {
          if (transaction.transaction === 'creation') {
            this.transactionTask.push({
              transaction: 'creation',
              data: `${transaction.name_user} создал задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }
          if (transaction.transaction === 'fixing_a_task') {
            this.transactionTask.push({
              transaction: 'fixing_a_task',
              data: `${transaction.name_user} изменил задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }

          // if (transaction.transaction === 'moving') {
          //   this.transactionTask.push({
          //     transaction: 'moving',
          //     data: `${transaction.name_user} переместил задачу.
          //     время: ${formatDate(transaction.createdAt, 'medium', 'en', '+0300')}`
          //   });
          // }

          // if (transaction.transaction === 'assigned_users') {
          //   this.transactionTask.push({
          //     transaction: 'assigned_users',
          //     data: `${transaction.name_user} переместил задачу.
          //     время: ${formatDate(transaction.createdAt, 'medium', 'en', '+0300')}`
          //   });
          // }

        })
      })
  }

  updateTitle() {
    // this.updateT = !this.updateT;

    const titleBoard = document.querySelector('.dialog-column-title');

    if (titleBoard !== null) {
      const childNode = titleBoard.firstChild;

      if (childNode !== null) {
        titleBoard.removeChild(childNode);
        const input = document.createElement('input');
        input.value = this.title;
        titleBoard.append(input);

        input.focus();

        input.addEventListener('blur', () => {
          titleBoard.innerHTML = input.value;
          this.title = input.value;

          this.taskService.updateTitle$(this._id, this.title)
            .subscribe((data) => {
              // console.log(data.title);
              this.title = data.title;
            })

          //   this.boardService.updateBoard$(
          //     this._boardId,
          //     this._boardName,
          //     localStorage.getItem('id'))
          //     .subscribe(({id, title, owner}) => {
          //       // if (title !== this._boardName) {
          //       this.owner = owner;
          //       this._boardName = title;
          //       // console.log('owner->', this.owner);
          //       // } else {
          //       //   this.owner = owner;
          //       //   console.log('owner->', this.owner);}
        });
      }
      // });
      console.log('title', this.title, 'id', this._id);
    }
  }

  showDetails() {
    console.log('showDetails');
  }

  archiveState() {
    const task: IArchive = this.data.item;

    // for (let i = 0; i < this.archiveService.archivedTasks[0].length; i++) {
    //   console.log('qqz');
    // }

    this.archiveService.setArchive$(task)
      .subscribe(() => {
        //     // if() {
        //     // }
        //     console.log('archive', this.data.item.id);
        //     // this.archiveService.archived = false;
        //     console.log('array', this.archiveService.archivedTasks[0]);
        //
        //     // this.archiveService.archivedTasks[0].forEach((item: any) => {
        //     //   console.log(item)
        //     // })
        //     // if(this.data.item.id === task.id) {
        //     //   console.log('qqz')
        //     // }
        //
        this.archiveService.archivedTasks[0].push(this.data.item);
      })
  }

  submit() {
    const descriptionUpdate: IDescriptionUpdate = {
      id: this._id,
      description: this.description.value
    }

    this.taskService.updateDescription(descriptionUpdate)
      .subscribe((task) => {
        this.data.item.description = task.description;
      });
  }
}


export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string,
    name: string,
    email: string
  };
}

export interface ISingUp {
  name: string,
  email: string,
  password?: string
}

export interface ISingIn {
  email: string,
  password: string
}

export interface IBoard {
  id: number,
  title: string,
  createdAt: Date,
  updatedAt: Date,
}

export interface ITask {
  id: number,
  title: string,
  board_id: number,
  description: string,
  nameTaskList: string,
  createdAt: Date,
  updatedAt: Date,
  order: number
  archive: boolean
}

export interface ICreateTask {
  title: string,
  description: string,
  nameTaskList: string,
  board_id: number,
  order: number
}

export interface IArchive {
  id: any,
  title: any,
  description: any,
  board_id: any,
  nameTaskList: any,
  createdAt: any,
  updatedAt: any,
  order: any,
  archive: any
}

export interface DialogData {
  board: string,
  invited: [{
    name: string,
    owner: boolean
  }],
  item: {
    id: number,
    title: string,
    description: string,
    nameTaskList: string,
    board_id: number,
    createdAt: any,
    updatedAt: any,
    order: number,
    archive: boolean
  }
}

export interface IDescriptionUpdate {
  id: number,
  description: string
}

export interface IInviteKey {
  key: string,
}

export interface IInvitedUsersName {
  owner: [
    {
      id: number,
      name: string,
      owner: boolean
    }
  ],
  names: [
    id: number,
    name: string,
    owner: boolean
  ]
}

export interface IOwner {
  userId: string | null,
  boardId: number
}

export interface IInitOwner {
  userId: number,
  owner: boolean
}

export interface IAssignedUser {
  id: number,
  name: string,
  owner: boolean,
  assigned?: boolean
}

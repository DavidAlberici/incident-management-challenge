export class Incidence {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public description: string,
    public status: string,
    public priority: string,
    public createdDate: string
  ) {

  }
}

export let statusList: string[] = ["Open", "In Progress", "Solved"]
export let priorityList: string[] = ["Low", "Medium", "High"]
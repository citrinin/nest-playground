export const ID_LENGTH: number = 11;

export abstract class BaseEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  protected beforeInsert(): void {
    this.id = Math.random().toString();
  }
}

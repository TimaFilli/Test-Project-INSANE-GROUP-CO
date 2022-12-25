class BaseError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }
}

export class ValidationError extends BaseError {
  constructor(message) {
    super(400, message);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message) {
    super(401, message);
  }
}

export class AuthorizationError extends BaseError {
  constructor(message) {
    super(403, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message) {
    super(404, message);
  }
}

export class BadRequestError extends BaseError {
  constructor(message) {
    super(400, message);
  }
}

export class InternalServerError extends BaseError {
  constructor(message) {
    super(500, message);
  }
}

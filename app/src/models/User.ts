import { Schema, model, Document, Types } from 'mongoose';

interface IBase extends Document {
  isDeleted?: Date;
}

interface IModule extends Document {
  title: string;
}

interface ICourse extends IBase {
  title: string;
  subTitle: string;
  modules: Types.DocumentArray<IModule>;
}

interface IUserRecord extends IBase {
  tenure: boolean;
}

const baseSchema = new Schema<IBase>({
  isDeleted: { type: Date, required: false }
}, {
  timestamps: true,
  collection: "testCollection"
});

const moduleSchema = new Schema<IModule>({
  title: { type: String, required: true }
});

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  modules: [moduleSchema],
});

courseSchema.pre('save', function (this: ICourse & Document<any, any, any>, next) {
  const allowedFields = ['title', 'subTitle', 'modules'];
  Object.keys(this.toObject()).forEach(key => {
    if (!allowedFields.includes(key)) {
      delete (this as any)[key]; // cast to any to access dynamic property
    }
  });
  next();
});

const userRecordSchema = new Schema<IUserRecord>({
  // classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  tenure: { type: Boolean, default: false },
});

// Define the discriminators
const BaseSchema = model<IBase>('BaseSchema', baseSchema);
const Course = BaseSchema.discriminator<ICourse>('Course', courseSchema);
const UserRecord = BaseSchema.discriminator<IUserRecord>('UserRecord', userRecordSchema);

const c = new Course({
  hello: true, // This should error but does not
})

const u = new UserRecord({
  anything: "what!!!" // This should error but does not
})


// Export the models
export { Course, UserRecord };

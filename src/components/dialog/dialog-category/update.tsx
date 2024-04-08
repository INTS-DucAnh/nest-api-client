import { CategoryFindItemType } from '@/common/type/category.type';
import CategoryForm from '@/components/form/category';
import { ReactNode } from 'react';
import SheetComponent from '../../ui/sheet';

export default function DialogUpdatecategory({
  trigger,
  category,
  onSuccess,
}: {
  category: CategoryFindItemType;
  trigger: ReactNode;
  onSuccess: () => void;
}) {
  return (
    <SheetComponent trigger={trigger} title='Update a Category' description='Update category will update all category attached to posts.'>
      <CategoryForm category={category} onSuccess={onSuccess} />
    </SheetComponent>
  );
}

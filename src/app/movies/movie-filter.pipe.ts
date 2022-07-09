import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from './movie.model';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(movies: Movie[], filterText: string): Movie[] {
    filterText = filterText.toLocaleLowerCase();
    console.log(filterText);
    return filterText
      ? movies.filter(
          (m: Movie) =>
            m.title.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            m.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : movies;
  }
}

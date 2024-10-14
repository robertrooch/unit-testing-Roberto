import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StddevComponent } from './stddev.component';
import { MediaComponent } from '../media/media.component';

describe('StddevComponent', () => {
  let component: StddevComponent;
  let fixture: ComponentFixture<StddevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StddevComponent],
      providers: [MediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StddevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return stddev = 572.03 for the first input', (done) => {
    const file = new File(["160,591,114,229,230,270,128,1657,624,1503\n15.0,69.9,6.5,22.4,28.4,65.9,19.4,198.7,38.8,138.2"], "numbers.txt", { type: 'text/plain' });
    component.calculateStddev(file);

    setTimeout(() => {
      expect(component.stddev1).toBe(542.67);
      done();
    }, 100);
  });

  it('should return stddev = 62.26 for the second input', (done) => {
    const file = new File(["160,591,114,229,230,270,128,1657,624,1503\n15.0,69.9,6.5,22.4,28.4,65.9,19.4,198.7,38.8,138.2"], "numbers.txt", { type: 'text/plain' });
    component.calculateStddev(file);

    setTimeout(() => {
      expect(component.stddev2).toBe(59.06);
      done();
    }, 100);
  });
});
